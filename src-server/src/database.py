import logging
logger = logging.getLogger(__name__)
from typing import List
from sqlalchemy import create_engine
from sqlalchemy import BigInteger, String, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from config import cfg


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    hashed_password: Mapped[str] = mapped_column()
    diabled: Mapped[bool] = mapped_column(default=False)
    roles: Mapped[List[str]] = mapped_column(ARRAY(String), default=[])


try:
    engine = create_engine(cfg.database_url)
    Base.metadata.create_all(engine)
except Exception as e:
    logger.error("Start Database Error")
    logger.error(e)
    exit(1)
