from flask import Flask
from flask_cors import CORS
from routes import routes

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
app.register_blueprint(routes)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
