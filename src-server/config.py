import json
from pydantic import BaseModel


class JWTConfig(BaseModel):
    """
    JWT 配置文件
    """

    secret_key: str
    expire_minutes: int


class RedisConfig(BaseModel):
    """
    Redis 配置文件
    """

    host: str
    port: int


class InfluxDBConfig(BaseModel):
    """
    InfluxDB 配置文件
    """

    url: str
    token: str
    org: str
    bucket: str


class Config(BaseModel):
    """
    配置文件
    """
    port: int
    database_url: str
    jwt: JWTConfig
    redis: RedisConfig
    influxdb: InfluxDBConfig
    


def load_config():
    with open("server-config.json", "r") as f:
        config = json.load(f)

    return Config.model_validate(config)


cfg = load_config()
