#!/usr/bin/env python3
from .base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship

class User(BaseModel, Base):
    __tablename__ = 'users'
    fullname = Column(String(128), nullable=True)
    email = Column(String(128), nullable=True)
    gender = Column(String(10), nullable=True)
    height = Column(Integer, nullable=True)


    # measurements = relationship('Measurement', back_populates='user', cascade='all, delete-orphan')
    def __init__(self, fullname=None, email=None, gender=None, height=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fullname = fullname
        self.email = email
        self.gender = gender
        self.height = height