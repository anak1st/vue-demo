from pydantic import BaseModel


class User(BaseModel):
    username: str

    class Config:
        from_attributes = True


class UserInDB(User):
    hashed_password: str


class UserCreate(User):
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
