import logging
logger = logging.getLogger(__name__)
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


# get password hash
def pwd_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt(12)).decode()


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
        "exp": exp,
        "name": username,
    }

    encoded_jwt = jwt.encode(data, cfg.jwt.secret_key, algorithm="HS256")
    return schemas.Token(access_token=encoded_jwt, token_type="bearer")


# use token to get user
# can be used as a dependency in a simple api
def get_user(token: str = Depends(oauth2_scheme)) -> schemas.User:
    try:
        payload = jwt.decode(token, cfg.jwt.secret_key, algorithms=["HS256"])
        username: str = payload.get("name")
        if username is None:
            raise ValueError("No username in token")
        user = curd.get_user_by_username(username=username)
        if user is None:
            raise ValueError("No user")
        return user
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid authentication credentials, reason: {e}")


def get_admin_user(token: str = Depends(oauth2_scheme)) -> schemas.User:
    user = get_user(token)
    if user.roles.get("admin") != True:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    logger.warning(user)
    return user
