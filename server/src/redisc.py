import redis
from config import cfg


redis_client = redis.Redis(host=cfg.redis.host, port=cfg.redis.port)
