#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Courses(BaseModel, Base):
    __tablename__ = 'courses'
    courseID = Column(String(120), nullable=True)
    courseName = Column(String(120), nullable=True)
   


    def __init__(self, courseID=None, courseName=None,*args, **kwargs):
        super().__init__(*args, **kwargs)
        self.courseID = courseID
        self.courseName = courseName
    content = relationship("Content", back_populates="course", cascade="all, delete-orphan")
      