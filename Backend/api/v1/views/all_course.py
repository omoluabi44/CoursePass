from api.v1.views import app_views
from flask import jsonify, make_response, abort, request
from web.model import storage
from web.model.all_course import Courses_list
from werkzeug.utils import secure_filename
import os

@app_views.route('/courses', methods=["GET"], strict_slashes=False)
def get_Courses_list():
    all_courses= storage.all(Courses_list).values()
    list_courses = []
    for i in all_courses:
        list_courses.append(i.to_dict())
    return jsonify(list_courses)



@app_views.route('/courses', methods=['POST'], strict_slashes=False)
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


# @app_views.route('/measure/<id>', methods=["GET"], strict_slashes=False)
# def get_measure_id(id):
#     measure = storage.get(Measurement, id)
#     if not measure:
#         abort(404)
#     return jsonify(measure.to_dict())


# @app_views.route('/measure/<id>', methods=["DELETE"], strict_slashes=False)
# def del_measure_id(id):
#     measure = storage.get(Measurement, id)
#     if not measure:
#         abort(404)
#     storage.delete(measure)
#     storage.save()
#     return make_response(jsonify({}), 200)
