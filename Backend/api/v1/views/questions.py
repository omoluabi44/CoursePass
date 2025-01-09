from api.v1.views import app_views
from flask import jsonify, make_response, abort, request
from models import storage
from models.questions import Questions
from models.course import Courses

import os

@app_views.route('/all_questions', methods=["GET"], strict_slashes=False)
def get_questions_list():
    all_questions= storage.all(Questions).values()
    list_questions = []
    for i in all_questions:
        list_questions.append(i.to_dict())
    return jsonify(list_questions)

@app_views.route('/courses/<course_id>/questions', methods=["GET"], strict_slashes=False)
def get_question(course_id):
    course = storage.get(Courses,course_id )
    if not course:
        abort(404)
   
    response = {
        "courseID": course.courseID,  # Use the courseID attribute from the course object
        "questions": [
            {
                "questionText": question.questionText,  # Access attributes using dot notation
                "options": question.options,           # Access options directly
                "correctAnswer": question.correctAnswer,
                "explanation": question.explanation
            }
            for question in course.questions  # Access associated questions
        ]
    }

    return jsonify([response]) 

@app_views.route('/questions', methods=['POST'], strict_slashes=False)
# @swag_from('documentation/user/post_user.yml', methods=['POST'])
def post_Questions():
    """
    Creates a Questions
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    # if 'courseID' not in request.get_json():
    #     abort(400, description="Missing courseID")
    if 'questionText' not in request.get_json():
        abort(400, description="Missing questionText")
    if 'correctAnswer' not in request.get_json():
        abort(400, description="Missing correctAnswer")
    if 'explanation' not in request.get_json():
        abort(400, description="Missing explanation")
 

    data = request.get_json()
    instance = Questions(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)
 

#  @app_views.route('/question/<question_id>', methods=['PUT'], strict_slashes=False)
#  def put_question(question_id):
#     """
#     Updates an existing Course.
#     """
#     question = storage.get(Questions, question_id)
#     if not question:
#         abort(404)
#     if not request.get_json():
#         abort(400, description="Not a JSON")
    
#     data = request.get_json()
#     ignore = ['id', 'created_at', 'updated_at']
#     for key, value in data.items():
#         if key not in ignore:
#             setattr(course, key, value)
#     question.save()
#     return make_response(jsonify(course.to_dict()), 200)

# @app_views.route('/question/<question_id>', methods=['DELETE'], strict_slashes=False)
# def delete_content(question_id):
#     """
#     Deletes Content by its ID.
#     """
#     question = storage.get(Questions, question_id)
#     if not question:
#         abort(404)
#     storage.delete(question)
#     storage.save()
#     return make_response(jsonify({}), 200)
