#!/usr/bin/env python3
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from uuid import uuid4
from sqlalchemy import Column, Integer, String, MetaData, DateTime
mymetadata = MetaData()
Base = declarative_base(metadata=mymetadata)
time = "%Y-%m-%dT%H:%M:%S.%f"

class BaseModel:
    id = Column(String(60), primary_key=True, unique=True, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    def __init__(self):
        self.id = str(int(uuid4().int))[:9]
        self.created_at = datetime.now()
        self.updated_at = self.created_at

    def __str__(self):
        return f"[{self.__class__.__name__}] ({self.id}) ({self.__dict__})"

    def save(self):
        from web import model
        self.updated_at = datetime.utcnow()
        model.storage.new(self)
        model.storage.save()
    
    def to_dict(self):
        """returns a dictionary containing all keys/values of the instance"""
        new_dict = self.__dict__.copy()
        if "created_at" in new_dict:
            new_dict["created_at"] = new_dict["created_at"].strftime(time)
        if "updated_at" in new_dict:
            new_dict["updated_at"] = new_dict["updated_at"].strftime(time)
        new_dict["__class__"] = self.__class__.__name__
        if "_sa_instance_state" in new_dict:
            del new_dict["_sa_instance_state"]
        return new_dict
      

