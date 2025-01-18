import time
import datetime
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import bcrypt
import jwt
from config import cfg
import curd
import schemas


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"}, 
)


# get password hash
def pwd_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt(11)).decode()


# check password
def pwd_check(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed_password.encode())


# check user is valid
# can be used in login api
def authenticate_user(username: str, password: str) -> bool:
    user = curd.get_userInDB_by_username(username)
    if not user:
        return False
    if not pwd_check(password, user.hashed_password):
        return False
    return True


# create a token
# can be used in login api
def create_access_token(username: str) -> schemas.Token:
    exp = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=cfg.jwt.expire_minutes)
    data = { 
        "sub": username,
        "exp": exp,
    }

    encoded_jwt = jwt.encode(data, cfg.jwt.secret_key, algorithm="HS256")
    return schemas.Token(access_token=encoded_jwt, token_type="bearer")


# use token to get user
# can be used as a dependency in a simple api
def get_user(token: str = Depends(oauth2_scheme)) -> schemas.User:
    try:
        payload = jwt.decode(token, cfg.jwt.secret_key, algorithms=["HS256"])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except:
        raise credentials_exception
    user = curd.get_user_by_username(username=username)
    if user is None:
        raise credentials_exception
    return user
