'''
app.py
- Main entry point of the backend
- Initializes the Flash app, register routes, loads configm and run the dev server
'''

from flask import Flask, jsonify
from flask_cors import CORS
from config.settings import SECRET_KEY, DEBUG
from routes.users import users_bp
from routes.garden import garden_bp
from routes.inventory import inventory_bp
from routes.shop import shop_bp
from routes.leaderboard import leaderboard_bp
from routes.discussion import discussion_bp
from routes.feedback import feedback_bp


def create_app():
    """
    Factory function that creates and configures the Flask app.
    Keeps the setup modular and clean.
    """
    app = Flask(__name__)
    CORS(app)  

    app.secret_key = SECRET_KEY

    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(garden_bp, url_prefix="/api/garden")
    app.register_blueprint(inventory_bp, url_prefix="/api/inventory")
    app.register_blueprint(shop_bp, url_prefix="/api/shop")
    app.register_blueprint(leaderboard_bp, url_prefix="/api/leaderboard")
    app.register_blueprint(discussion_bp, url_prefix="/api/discussion")
    app.register_blueprint(feedback_bp, url_prefix="/api/feedback")

    @app.route("/")
    def home():
        return jsonify({"message": "StudyWorld backend is running!"})

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=DEBUG)
