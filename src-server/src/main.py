import config_logger
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
from config import cfg
import auth
import curd
import schemas
from scheduler import scheduler
import system_status


@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler.start()
    yield
    scheduler.shutdown(wait=False)


app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def Ok(data):
    return {"code": 0, "msg": "OK", "data": data}


def Error(code, msg):
    return {"code": code, "msg": msg}


def Page(records, page_no, page_size, page_count, item_count):
    return {
        "records": records,
        "page_no": page_no,
        "page_size": page_size,
        "page_count": page_count,
        "item_count": item_count
    }


@app.post("/login")
async def login(form_data: auth.OAuth2PasswordRequestForm = Depends()):
    if not auth.authenticate_user(form_data.username, form_data.password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    return auth.create_access_token(form_data.username)


@app.post("/users/create")
async def create_user(user: schemas.UserCreate):
    if curd.get_user_by_username(user.username):
        return Error(101, "User already exists")
    return Ok(curd.create_user(user.username, auth.pwd_hash(user.password)))


@app.get("/users/all")
async def read_users(page_no: int = 1, page_size: int = 100, user: schemas.User = Depends(auth.get_admin_user)):
    if page_size < 0 or page_size > 100:
        return Error(101, "page size must be between 0 and 100")
    user_count = curd.get_users_count()
    return Ok(Page(curd.get_users(page_no, page_size), page_size, page_no, (user_count + page_size - 1) // page_size, user_count))


@app.get("/users/id/{user_id}")
async def read_user(user_id: int, user: schemas.User = Depends(auth.get_user)):
    res = curd.get_user_by_id(user_id)
    if not res:
        return Error(101, "User not found")
    return Ok(res)


@app.post("/users/id/{user_id}/roles")
async def update_user_roles(user_id: int, roles: dict, user: schemas.User = Depends(auth.get_user)):
    res = curd.update_user_roles(user_id, roles)
    if not res:
        return Error(101, "User not found")
    return Ok(res)


@app.get("/users/me")
async def read_user_me(user: schemas.User = Depends(auth.get_user)):
    return Ok(user)


@app.get("/system_status")
async def read_system_status(second: int = 10, aggregate_window: int = None, user: schemas.User = Depends(auth.get_user)):
    return Ok(await system_status.get_system_status(second, aggregate_window))


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=cfg.port, log_config=None)
