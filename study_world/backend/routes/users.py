'''
routes/user.py
- Defines all user-related enpoints (signup, login, profile, etc...)
- Calls functions from user_controller.py for actual logic
'''
from flask import request, jsonify
from config.supabase_client import supabase
from utils.error_handler import handle_api_error
from utils.auth_utils import create_token
from datetime import datetime

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