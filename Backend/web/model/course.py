#!/usr/bin/env python3
from .base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer
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
      