#!/usr/bin/env python3
from .base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer,ForeignKey
from sqlalchemy.orm import relationship

class Content(BaseModel, Base):
    __tablename__ = 'courseOutline'
    week = Column(String(20), nullable=True)
    course_id = Column(String(60), ForeignKey('courses.id'), nullable=True)
    topic = Column(String(120), nullable=True)
    content = Column(String(120), nullable=True)
   


    def __init__(self, week=None, course_id=None,topic=None, content=None,*args, **kwargs):
        super().__init__(*args, **kwargs)
        self.week = week
        self.course_id = course_id
        self.topic = topic
        self.content = content
    course = relationship("Courses", back_populates="content") 