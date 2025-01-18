import json
from pydantic import BaseModel


class RedisConfig(BaseModel):
    """
    Redis 配置文件
    """

    host: str
    port: int


class JWTConfig(BaseModel):
    """
    JWT 配置文件
    """

    secret_key: str
    expire_minutes: int


class Config(BaseModel):
    """
    配置文件
    """
    port: int
    database_url: str
    redis: RedisConfig
    jwt: JWTConfig


def load_config():
    with open("config.json", "r") as f:
        config = json.load(f)

    return Config.model_validate(config)


cfg = load_config()
