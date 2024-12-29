#!/usr/bin/env python3
from os import getenv
from sqlalchemy import (create_engine)
from sqlalchemy.ext.declarative import declarative_base
from ..base_model import Base
from ..user import User
from ..users_measure import Measurement
from ..all_course import Courses_list
from sqlalchemy.orm import sessionmaker, scoped_session

classes = [User, Measurement, Courses_list]

class DBStorage:
    __engine = None
    __session = None

    def __init__(self):
        usr = getenv('BDYM_MYSQL_USER')
        usrpsw = getenv('BDYM_MYSQL_PWD')
        usrhst = getenv('BDYM_MYSQL_HOST')
        usrdb = getenv('BDYM_MYSQL_DB')
        # env = getenv('BDYM_ENV')
        
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'
                                    .format(usr, usrpsw, usrhst, usrdb),
                                    pool_pre_ping=True)
    def all(self, cls=None):
            """All the object in the current database session"""
            result = {}
            if cls:
                objects = self.__session.query(cls).all()
            else:
                objects = []
                for model_class in classes:
                    objects.extend(self.__session.query(model_class).all())
            for obj in objects:
                key = f"{type(obj).__name__}.{obj.id}"
                result[key] = obj
            return (result)
    def new(self, obj):
            """Add the object to the current database session"""
            self.__session.add(obj)
    def save(self):
            """save the object to the current database session"""
            self.__session.commit()

    def delete(self, obj=None):
        """Delete obj from the current database session if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """Create all tables and initialize session with the database"""
        Base.metadata.create_all(self.__engine)
        sec = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sec)
        self.__session = Session()
    def get(self, cls, id):
        from .. import model
        if cls not in classes:
            return None
        all_cls = model.storage.all(cls)
        for value in all_cls.values():
            if (value.id == id):
                return value

    def close(self):
        self.__session.close()
