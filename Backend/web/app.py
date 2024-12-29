#!/usr/bin/env python3
from flask import Flask, render_template, request, redirect, url_for
from model.user import User
import os
from flask_cors import CORS
from werkzeug.utils import secure_filename
from model.__init__ import storage
# from measure import pro_image

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

@app.route('/')
def index():
    return render_template('HomePage.html')

@app.route('/Form')
def form():
    return render_template('Form.html')

@app.route('/measurement')
def measure():
    return render_template('Measurement.html')

# @app.route('/upload', methods=['POST'])
# def upload_image():
#     print(request.files.keys())  # Debugging line
    
#     # Get form data
#     fullname = request.form.get('fullname')
#     email = request.form.get('email')
#     height = request.form.get('height')
#     gender = request.form.get('gender')

    
#     # Get file
#     file = request.files.get('input-file')
#     if not file:
#         return "No file part", 400
    
#     filename = secure_filename(file.filename)
#     print("the file is ",filename)
#     # pro_image(filename)
#     file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#     file.save(file_path)
#     pro_image(file_path)
#     new_user = User(fullname, email, gender, height)
#     storage.new(new_user)
#     storage.save()
#     print (new_user)
    
#     # # Print statements for debugging
#     # print(f"Full Name: {fullname}")
#     # print(f"Email: {email}")
#     # print(f"Height: {height} cm")
#     # print(f"Gender: {gender}")
#     # print(f"File saved to: {file_path}")

#     return "Form successfully submitted"

if __name__ == '__main__':
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
   
    app.run(debug=True, host='0.0.0.0', port=5000)
