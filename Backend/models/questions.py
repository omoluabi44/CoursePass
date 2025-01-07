#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, JSON
from sqlalchemy.orm import relationship


class Questions(BaseModel, Base):
    __tablename__ = 'questions'
    courseID = Column(String(120), ForeignKey('courses.courseID') , nullable=False )
    questionText = Column(String(255), nullable=False, unique=False)
    correctAnswer = Column(String(120), nullable=False, unique=False)
    explanation=  Column(String(500), nullable=False, unique=False)
    options = Column(JSON, nullable=False)
    course_ref = relationship("Courses", back_populates="questions")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
   