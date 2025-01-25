from pydantic import BaseModel


class User(BaseModel):
    id: int
    username: str
    diabled: bool = False
    roles: dict = {}

    class Config:
        from_attributes = True


class UserInDB(User):
    hashed_password: str


class UserCreate(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
