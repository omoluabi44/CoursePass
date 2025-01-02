from api.v1.views import app_views
from flask import jsonify, make_response, abort, request
from models import storage
from models.all_course import Courses_list

import os

@app_views.route('/all_courses', methods=["GET"], strict_slashes=False)
def get_Courses_list():
    all_courses= storage.all(Courses_list).values()
    list_courses = []
    for i in all_courses:
        list_courses.append(i.to_dict())
    return jsonify(list_courses)



@app_views.route('/all_courses', methods=['POST'], strict_slashes=False)
# @swag_from('documentation/user/post_user.yml', methods=['POST'])
def post_Courses_list():
    """
    Creates a user
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'name' not in request.get_json():
        abort(400, description="Missing name")
    if 'courseID' not in request.get_json():
        abort(400, description="Missing courseID")
    if 'semester' not in request.get_json():
        abort(400, description="Missing semester")
    if 'college' not in request.get_json():
        abort(400, description="Missing college")
    if 'level' not in request.get_json():
        abort(400, description="Missing level")
    if 'department' not in request.get_json():
        abort(400, description="Missing department")

    data = request.get_json()
    instance = Courses_list(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)
 



