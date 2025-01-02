#  # Assuming the Courses and Content models are imported
# from sqlalchemy.exc import IntegrityError
# from api.v1.views import app_views
# from flask import jsonify, make_response, abort, request
# from web.model import storage
# from web.model.course import Courses
# from web.model.course_content import Content


# @app_views.route('/courses', methods=['POST'], strict_slashes=False)
# def post_Courses():
#     """
#     Creates a new course along with course content.
#     - The request body must include both course information and course outline (content).
#     """
#     if not request.get_json():
#         abort(400, description="Not a JSON")
    
#     data = request.get_json()

 
#     if 'courseID' not in data:
#         abort(400, description="Missing courseID")
#     if 'courseName' not in data:
#         abort(400, description="Missing courseName")
#     if 'courseOutline' not in data:
#         abort(400, description="Missing course content")
  
#     new_course = Courses(
#         courseID=data['courseID'],
#         courseName=data['courseName']
#     )
#     new_course.save()
#     course_content = data['courseOutline'] 
#     for content_data in course_content:
#         if 'week' not in content_data or 'topic' not in content_data or 'content' not in content_data:
#             continue  
        
#         new_content = Content(
#             week=content_data['week'],
#             topic=content_data['topic'],
#             content=content_data['content'],
#             course_id=new_course.id  
#         )
#         new_content.save()  


    

#     return make_response(jsonify(new_course.to_dict()), 201)
   
# @app_views.route('/courses', methods=['GET'], strict_slashes=False)
# def get_all_courses():
#     """
#     Get all courses with their course outline (content).
#     """
    
  
#     all_courses = storage.all(Courses).values()
    
#     list_courses = []

#     for course in all_courses:

#         course_data = course.to_dict()
#         course_data['courseOutline'] = []
#         course_outlines = storage.all(Content).values()
#         for content in course_outlines:
#             if content.course_id == course.id:
#                 course_data['courseOutline'].append({
#                     'week': content.week,
#                     'topic': content.topic,
#                     'content': content.content
#                 })
#         list_courses.append(course_data)
#     return jsonify(list_courses)


from flask import abort, jsonify, make_response, request
from api.v1.views import app_views
from web.model import storage
from web.model.course import Courses
from web.model.course_content import Content

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
