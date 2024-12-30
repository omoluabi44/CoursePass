 # Assuming the Courses and Content models are imported
from sqlalchemy.exc import IntegrityError
from api.v1.views import app_views
from flask import jsonify, make_response, abort, request
from web.model import storage
from web.model.course import Courses
from web.model.course_content import Content


@app_views.route('/courses', methods=['POST'], strict_slashes=False)
def post_Courses():
    """
    Creates a new course along with course content.
    - The request body must include both course information and course outline (content).
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    
    data = request.get_json()

 
    if 'courseID' not in data:
        abort(400, description="Missing courseID")
    if 'courseName' not in data:
        abort(400, description="Missing courseName")
    if 'courseOutline' not in data:
        abort(400, description="Missing course content")
  
    new_course = Courses(
        courseID=data['courseID'],
        courseName=data['courseName']
    )
    new_course.save()
    course_content = data['courseOutline'] 
    for content_data in course_content:
        if 'week' not in content_data or 'topic' not in content_data or 'content' not in content_data:
            continue  
        
        new_content = Content(
            week=content_data['week'],
            topic=content_data['topic'],
            content=content_data['content'],
            course_id=new_course.id  
        )
        new_content.save()  


    

    return make_response(jsonify(new_course.to_dict()), 201)
   
@app_views.route('/courses', methods=['GET'], strict_slashes=False)
def get_all_courses():
    """
    Get all courses with their course outline (content).
    """
    
    # Retrieve all courses from the database
    all_courses = storage.all(Courses).values()
    
    list_courses = []

    for course in all_courses:
        # Convert each course object to a dictionary
        course_data = course.to_dict()
        
        # Initialize the courseOutline field as an empty list
        course_data['courseOutline'] = []
        
        # Retrieve all course outlines (content)
        course_outlines = storage.all(Content).values()
        
        # Loop through the course outlines and add the relevant content
        for content in course_outlines:
            if content.course_id == course.id:
                course_data['courseOutline'].append({
                    'week': content.week,
                    'topic': content.topic,
                    'content': content.content
                })
        
        # Add the course data with its outline to the list
        list_courses.append(course_data)

    # Return the list of courses as a JSON response
    return jsonify(list_courses)


