#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Content(BaseModel, Base):
    __tablename__ = 'course_outline'
    week = Column(String(20), nullable=True)
    courseID = Column(String(60), ForeignKey('courses.courseID'), nullable=False)
    topic = Column(String(120), nullable=True)
    content = Column(String(5200), nullable=True)
    course = relationship("Courses", back_populates="content")
   


    def __init__(self,*args, **kwargs):
        super().__init__(*args, **kwargs)
 