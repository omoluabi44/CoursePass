from flask import abort, jsonify, make_response, request
from api.v1.views import app_views
from models import storage
from models.course import Courses


# Get all courses
@app_views.route('/courses', methods=['GET'], strict_slashes=False)
def get_all_courses():
    """
    Retrieves the list of all Courses.
    """
    courses = storage.all(Courses).values()
    return jsonify([course.to_dict() for course in courses])


# Get a specific course by ID
@app_views.route('/courses/<course_id>', methods=['GET'], strict_slashes=False)
def get_course(course_id):
    """
    Retrieves a Course by its ID.
    """
    course = storage.get(Courses, course_id)
    if not course:
        abort(404)
    return jsonify(course.to_dict())


# Create a new course
@app_views.route('/courses', methods=['POST'], strict_slashes=False)
def post_course():
    """
    Creates a new Course.
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    if 'courseID' not in data:
        abort(400, description="Missing courseID")
    if 'courseName' not in data:
        abort(400, description="Missing courseName")

    course = Courses(**data)
    course.save()
    return make_response(jsonify(course.to_dict()), 201)


# Update a course
@app_views.route('/courses/<course_id>', methods=['PUT'], strict_slashes=False)
def put_course(course_id):
    """
    Updates an existing Course.
    """
    course = storage.get(Courses, course_id)
    if not course:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    ignore = ['id', 'created_at', 'updated_at']
    for key, value in data.items():
        if key not in ignore:
            setattr(course, key, value)
    course.save()
    return make_response(jsonify(course.to_dict()), 200)


# Delete a course
@app_views.route('/courses/<course_id>', methods=['DELETE'], strict_slashes=False)
def delete_course(course_id):
    """
    Deletes a Course by its ID.
    """
    course = storage.get(Courses, course_id)
    if not course:
        abort(404)
    storage.delete(course)
    storage.save()
    return make_response(jsonify({}), 200)
