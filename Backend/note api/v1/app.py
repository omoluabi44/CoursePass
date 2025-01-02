from flask import Flask, jsonify
from web.model.__init__ import storage
from api.v1.views import app_views
from os import getenv
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(app_views)
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})
@app.teardown_appcontext
def db_close(error):
    storage.close()

@app.errorhandler(404)
def not_found(error):
    """ 404 Error """
    return jsonify({"error": "Not found"}), 404

if __name__ == "__main__":
    host = getenv("BDYM_API_HOST", "0.0.0.0")
    port = getenv("BDYM_API_PORT", "5000")
    app.run(host=host, port=port, threaded=True,debug=True)