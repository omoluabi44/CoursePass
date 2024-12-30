#!/usr/bin/env python3
from .base_model import BaseModel
from .user import User
from .engines.db_storage import DBStorage
from os import getenv

storage_type = getenv('BDYM_TYPE_STORAGE')
if storage_type == 'db':
    storage = DBStorage()
storage.reload()