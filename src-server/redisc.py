import redis
from config import cfg


redisc = redis.Redis(host=cfg.redis.host, port=cfg.redis.port)
