from fastapi import Depends, FastAPI, HTTPException
import uvicorn
from config import cfg
import auth
import curd
import schemas


app = FastAPI()


@app.post("/login")
async def login(form_data: auth.OAuth2PasswordRequestForm = Depends()):
    if not auth.authenticate_user(form_data.username, form_data.password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    return auth.create_access_token(form_data.username)


@app.post("/users")
async def create_user(user: schemas.UserCreate):
    if curd.get_user_by_username(user.username):
        raise HTTPException(status_code=400, detail="Username already registered")
    return curd.create_user(user.username, auth.pwd_hash(user.password))


@app.get("/users/me")
async def read_users_me(user: str = Depends(auth.get_user)):
    return user


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=cfg.port, reload=True)
