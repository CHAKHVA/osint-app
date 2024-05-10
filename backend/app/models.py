from sqlalchemy import Column, Integer, String

from .database import Base


class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True)
    domain = Column(String, unique=True, index=True)
    tool = Column(String, unique=True, index=True)
    start_time = Column(String, unique=True)
    end_time = Column(String, unique=True)
    results = Column(String, unique=True)
