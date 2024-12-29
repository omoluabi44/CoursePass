from api.v1.views import app_views
from flask import jsonify, make_response, abort, request
from web.model import storage
from web.model.users_measure import Measurement
from werkzeug.utils import secure_filename
import os

@app_views.route('/measure', methods=["GET"], strict_slashes=False)
def get_measure():
    all_measure = storage.all(Measurement).values()
    list_measure = []
    for i in all_measure:
        list_measure.append(i.to_dict())
    return jsonify(list_measure)

@app_views.route('/measure/<id>', methods=["GET"], strict_slashes=False)
def get_measure_id(id):
    measure = storage.get(Measurement, id)
    if not measure:
        abort(404)
    return jsonify(measure.to_dict())


@app_views.route('/measure/<id>', methods=["DELETE"], strict_slashes=False)
def del_measure_id(id):
    measure = storage.get(Measurement, id)
    if not measure:
        abort(404)
    storage.delete(measure)
    storage.save()
    return make_response(jsonify({}), 200)
