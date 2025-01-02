#!/usr/bin/env python3
import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Courses_list(BaseModel, Base):
    if models.storage_t == "db":
        __tablename__ = 'all_courses'
        name = Column(String(120), nullable=False)
        courseID = Column(String(120), nullable=False ,unique=True)
        semester = Column(String(120), nullable=False)
        college = Column(String(150), nullable=False)
        level = Column(String(150), nullable=False)
        department = Column(String(50), nullable=False)
    else:
        name = ""
        courseID = ""
        semester = ""
        college = ""
        level = ""
        department = ""


    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
   