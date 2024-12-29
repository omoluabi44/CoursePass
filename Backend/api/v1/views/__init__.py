#!/usr/bin/python3
"""The Blueprint for API """
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')
from api.v1.views.index import *
from api.v1.views.user import *
from api.v1.views.measure import *
from api.v1.views.all_course import *