#!/usr/bin/env python3
from .base_model import BaseModel, Base
from sqlalchemy import Column, Integer,ForeignKey, String
from sqlalchemy.orm import relationship
class Measurement(BaseModel, Base):
    __tablename__ = 'measurements'
    height= Column(Integer, nullable=True)
    wrist = Column(Integer, nullable=True)
    chest_width = Column(Integer, nullable=True)
    leg = Column(Integer, nullable=True)
    # user_id = Column(String(60), ForeignKey('users.id'), nullable=False) 
    arms = Column(Integer, nullable=True)


    # user = relationship('User', back_populates='measurements')
    def __init__(self, height=None, wrist=None, chest_width =None, leg=None,  arms=None ,*args, **kwargs):
        super().__init__(*args, **kwargs)
        self.height= height
        self.wrist = wrist 
        # self.user_id = user_id
        self.chest_width = chest_width
        self.leg = leg
        self.arms = arms