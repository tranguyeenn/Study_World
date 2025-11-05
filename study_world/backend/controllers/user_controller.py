'''
controllers/user_controller.py
- Implements logic for authentication, registration, profile updates, and user queries
'''

from config.supabase_client import supabase
from utils.error_handler import handle_api_error
from utils.auth_utils import create_token
from datetime import datetime, timedelta, timezone
import bcrypt

def get_all_users():
    '''
    Fetch all users
    '''

    try:
        response = supabase.table("users").select("*").execute()
        return response.data
    except Exception as e:
        return handle_api_error(e)

def get_user_by_id(user_id):
    '''
    Fetch a single user by ID
    '''

    try:
        response = supabase.table("users").select("*").eq("id", user_id).single().execute()
        return response.data
    except Exception as e:
        return handle_api_error(e)

def create_user(data):
    '''
    Create a new user account
    '''

    try:
        existing = supabase.table("users").select("id").eq("email", data.get("email")).execute().data
        if existing:
            return {"erorr": "Email already registered"}

        plain_pw = data.get("password")
        if not plain_pw:
            return {"error": "Password required"}
        
        hashed_pw = bcrypt.hashpw(plain_pw.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        data["password_hash"] = hashed_pw
        del data["password"]

        response = supabase.table("users").insert(data).execute()
        return response.data
    except Exception as e:
        return handle_api_error(e)

def update_user(user_id, data):
    '''
    Update an existing user's info
    '''

    try:
        response = supabase.table("users").update(data).eq("id", user_id).execute()
        return response.data
    except Exception as e:
        return handle_api_error(e)

def delete_user(user_id):
    '''
    Delete a user account
    '''

    try:
        response = supabase.table("users").delete().eq("id", user_id).execute()
        return response.data
    except Exception as e:
        return handle_api_error(e)

def add_xp(user_id, xp_earned):
    '''
    Add XP to the user and handle level-up automatically
    '''

    try:
        user = supabase.table("users").select("xp", "level").eq("id", user_id).single().execute().data
        if not user:
            return {"error": "user not found"}
        
        new_xp = user["xp"] + xp_earned

        new_level = 1 + (new_xp // 100)
        
        update_data = {"xp": new_xp, "level": new_level}
        response = supabase.table("users").update(update_data).eq("id", user_id).execute()
        return response.data
    
    except Exception as e:
        return handle_api_error(e)

def update_level(user_id, new_level):

    '''
    Force-update a user's level
    '''

    try:
        response = supabase.table("users").update({"level": new_level}).eq("id", user_id).execute()
        return response.data
    except Exception as e:
        return handle_api_error(e)

def update_coins(user_id, coins_change):

    '''
    Add or subtract coins from a user's balance.
    '''

    try:
        user = supabase.table("users").select("coins").eq("id", user_id).single().execute().data
        if not user:
            return {"error": "Users not found"}
        
        new_balance = max(0, user["coins"] + coins_change)
        response = supabase.table("users").update({"coins": new_balance}).eq("id", user_id).execute()
        return response.data
    
    except Exception as e:
        return handle_api_error(e)
    
def update_streak(user_id, last_study_date=None):
    '''
    Update user's daily streak.
    If last_study_date is within 24 hours, streak increases.
    If user skipped a day, streak resets.
    '''
    try:
        user = supabase.table("users").select("streak, updated_at").eq("id", user_id).single().execute().data
        if not user:
            return {"error": "Users not found"}
        
        last_updated = user.get("updated_at")
        current_streak = user.get("streak", 0)
        now = datetime.now(timezone.utc)

        if not last_updated:
            new_streak = 1
        else:
            last_date = datetime.strptime(last_updated, "%Y-%m-%dT%H:%M:%S.%fZ")

            if now.date() == last_date.date():
                new_streak = current_streak
            elif now - last_date < timedelta(days=2):
                new_streak = current_streak + 1
            else:
                new_streak = 1
        
        response = supabase.table("users").update({
            "streak": new_streak,
            "updated_at": now.isoformat()
        }).eq("id", user_id).execute()

        return response.data

    except Exception as e:
        return handle_api_error(e)

def authenticate_user(email, password):

    '''
    Verify login credentials
    In production: Integrate Supabase Auth or hash password
    '''

    try:
        user = supabase.table("users").select("*").eq("email", email).single().execute().data
        if not user:
            return {"error": "invalid email or password"}
        
        stored_hash = user["password_hash"]
        if not bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8')):
            return {'error': 'Invalid email or password'}
        
        token = create_token(user["id"])
        return {"message": "Login successful", "token": token}
    
    except Exception as e:
        return handle_api_error(e)