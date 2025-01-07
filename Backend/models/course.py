#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Courses(BaseModel, Base):
    __tablename__ = 'courses'
    courseID = Column(String(120), nullable=False, unique=True)
    courseName = Column(String(120), nullable=False, unique=True)
    content = relationship("Content", back_populates="course", cascade="all, delete-orphan")
    questions = relationship("Questions", back_populates="course_ref", cascade="all, delete-orphan")


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
   