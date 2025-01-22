from typing import List
from sqlalchemy.orm import Session
import database
import schemas


def create_user(username: str, hashed_password: str) -> schemas.User:
    # check password is hashed ?
    if not hashed_password.startswith("$2b$"):
        raise ValueError("Password is not hashed")

    with Session(database.engine) as session:
        user = database.User(username=username, hashed_password=hashed_password)
        session.add(user)
        session.commit()
        session.refresh(user)
        return schemas.User.model_validate(user)
    

def get_users(offset: int = 0, limit: int = 100) -> List[schemas.User]:
    with Session(database.engine) as session:
        res = session.query(database.User).offset(offset).limit(limit).all()
        return [schemas.User.model_validate(user) for user in res]
    

def get_user_by_id(user_id: int) -> schemas.User:
    with Session(database.engine) as session:
        res = session.query(database.User).filter(database.User.id == user_id).first()
        if res is None:
            return None
        return schemas.User.model_validate(res)


def get_user_by_username(username: str) -> schemas.User:
    with Session(database.engine) as session:
        res = session.query(database.User).filter(database.User.username == username).first()
        if res is None:
            return None
        return schemas.User.model_validate(res)


# IMPORTANT: This is a dangerous function
# because it returns a UserInDB object, which has a hashed_password attribute.
def get_userInDB_by_username(username: str) -> schemas.UserInDB:
    with Session(database.engine) as session:
        res = session.query(database.User).filter(database.User.username == username).first()
        if res is None:
            return None
        return schemas.UserInDB.model_validate(res)


def update_user_roles(user_id: int, roles: dict) -> schemas.User:
    with Session(database.engine) as session:
        user = session.query(database.User).filter(database.User.id == user_id).first()
        user.roles = roles
        session.commit()
        session.refresh(user)
        return schemas.User.model_validate(user)
