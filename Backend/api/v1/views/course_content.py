from api.v1.views import app_views
from flask import jsonify, make_response, abort, request
from models import storage
from models.course_content import Content
from models.course import Courses

import os

@app_views.route('/courses/<course_id>/content', methods=['GET'], strict_slashes=False)
def get_course_content(course_id):
    """
    Retrieves the list of all Content for a specific Course.
    """
    course = storage.get(Courses, course_id)
    if not course:
        abort(404)

    content_list = [content.to_dict() for content in course.content]
    return jsonify(content_list)


# Get a specific content by ID
@app_views.route('/content/<content_id>', methods=['GET'], strict_slashes=False)
def get_content(courseID):
    """
    Retrieves a specific Content by its ID.
    """
    content = storage.get(Content, courseID)
    if not content:
        abort(404)
    return jsonify(content.to_dict())


@app_views.route('/courses/<course_id>/content', methods=['POST'], strict_slashes=False)
def post_content(course_id):
    """
    Creates new Content for a specific Course.
    """
    course = storage.get(Courses, course_id)
    if not course:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    if 'week' not in data:
        abort(400, description="Missing week")
    if 'topic' not in data:
        abort(400, description="Missing topic")
    if 'content' not in data:
        abort(400, description="Missing content")
    
    # Remove course_id from data if it exists to avoid conflicts
    data.pop('course_id', None)
    
    content = Content(course_id=course.courseID, **data)  # Use course.courseID here explicitly
    content.save()
    return make_response(jsonify(content.to_dict()), 201)



# Update content
@app_views.route('/content/<content_id>', methods=['PUT'], strict_slashes=False)
def put_content(content_id):
    """
    Updates existing Content.
    """
    content = storage.get(Content, content_id)
    if not content:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()
    ignore = ['id', 'course_id', 'created_at', 'updated_at']
    for key, value in data.items():
        if key not in ignore:
            setattr(content, key, value)
    content.save()
    return make_response(jsonify(content.to_dict()), 200)


# Delete content
@app_views.route('/content/<content_id>', methods=['DELETE'], strict_slashes=False)
def delete_content(content_id):
    """
    Deletes Content by its ID.
    """
    content = storage.get(Content, content_id)
    if not content:
        abort(404)
    storage.delete(content)
    storage.save()
    return make_response(jsonify({}), 200)
