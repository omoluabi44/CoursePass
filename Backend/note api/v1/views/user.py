from api.v1.views import app_views
from flask import jsonify, make_response, abort, request
from web.model import storage
from web.model.user import User

from werkzeug.utils import secure_filename
import os


UPLOAD_FOLDER = 'uploads/'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app_views.route('/users',  methods=['GET'], strict_slashes=False)
def get_users():
    all_user = storage.all(User).values()
    list_User = []
    for user in all_user:
        list_User.append(user.to_dict())
    return jsonify(list_User)

@app_views.route('/users/<id>',  methods=['GET'], strict_slashes=False)
def get_users_id(id):
    user = storage.get(User, id)    
    if not user:
        abort(404)
    return jsonify(user.to_dict())


@app_views.route('/users/<id>',  methods=['DELETE'], strict_slashes=False)
def del_users_id(id):
    user = storage.get(User, id)    
    if not user:
        abort(404)
    storage.delete(user)
    storage.save()
    return make_response(jsonify({}), 200)



@app_views.route('/users', methods=['POST'], strict_slashes=False)
def create_user():
    if 'file' not in request.files:
        abort(400, description="missing file")

    # Handle file upload
    file = request.files['file']
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)
    

    # Handle other form-data fields
    fullname = request.form.get('fullname')
    email = request.form.get('email')
    gender = request.form.get('gender')
    height = request.form.get('height')

    if not fullname or not email or not file or not height:
        abort(400, description="Missing required fields")

    # Create user instance
    data = {
        'fullname': fullname,
        'email': email,
        'gender': gender,
        'height': height
    }

    # instance = User(**data)
    # instance.save()
    # T_height, T_leg, T_hand, T_chest, T_hip = pro_image(file_path, instance.height)
    # # measures = Measurement(T_height, T_hand, T_leg,  T_chest, T_hip)
    # measures = Measurement(T_height, T_hip, T_chest, T_leg, T_hand)
    # storage.new( measures)
    # storage.save()
    # print(measures.to_dict())
    return make_response(jsonify(measures.to_dict()), 201)









