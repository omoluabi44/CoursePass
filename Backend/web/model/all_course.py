#!/usr/bin/env python3
from .base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship

class Courses_list(BaseModel, Base):
    __tablename__ = 'all_courses'
    name = Column(String(120), nullable=True)
    courseID = Column(String(120), nullable=True)
    semester = Column(String(120), nullable=True)
    college = Column(String(150), nullable=True)
    level = Column(String(150), nullable=True)
    department = Column(String(50), nullable=True)


    # measurements = relationship('Measurement', back_populates='user', cascade='all, delete-orphan')
    def __init__(self, name=None, courseID=None, semester=None, college=None, level=None, department=None,*args, **kwargs):
        super().__init__(*args, **kwargs)
        self.name = name
        self.courseID = courseID
        self.semester = semester
        self.college = college
        self.level = level
        self.department = department