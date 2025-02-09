#!/usr/bin/python3
""" Blueprint for API """
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.views.index import *
from api.v1.views.courses import *
from api.v1.views.all_courses import *
from api.v1.views.course_content import *
from api.v1.views.questions import *
