'''
routes/users.py
- Defines all user-related enpoints (signup, login, profile, etc...)
- Calls functions from user_controller.py for actual logic
'''
# routes/users.py
from flask import Blueprint, request, jsonify
from config.supabase_client import supabase
from utils.error_handler import handle_api_error
from utils.auth_utils import create_token
from datetime import datetime

# Create the blueprint
users_bp = Blueprint("users", __name__)

@users_bp.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()
    user_email = data.get("email")
    password = data.get("password")

    try:
        result = supabase.table("users").insert({
            "email": user_email,
            "password": password,
            "created_at": datetime.now().isoformat()
        })
        token = create_token(result.data[0]["id"])
        return jsonify({"user": result.data[0], "token": token}), 201

    except Exception as error:
        return handle_api_error(error)

