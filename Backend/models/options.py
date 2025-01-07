#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Options(BaseModel, Base):
    __tablename__ = 'options'
    questionID = Column(String(120), ForeignKey('courses.courseID') , nullable=False )
    questionText = Column(String(255), nullable=False, unique=False)
    correctAnswer = Column(String(120), nullable=False, unique=False)
    explanation=  Column(String(500), nullable=False, unique=False)
    course_ref = relationship("Courses", back_populates="questions")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
   