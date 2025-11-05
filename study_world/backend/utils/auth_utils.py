'''
utils/auth_utils.py
- Functions for token generation, decoding, and user authentication checks
'''

import os
import jwt
from datetime import datetime, timedelta
from config.supabase_client import supabase

JWT_SECRET = os.getenv("JWT_SECRET", "change_this_secret")

def create_token(user_id):
    payload = {
        "user_id": user_id,
        "expiration": datetime.now() + timedelta(days=7),
        "issued at": datetime.now()
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def verify_token(token):
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=("HS256"))
        return decoded("user_id")
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def get_user_from_token(token):
    user_id = verify_token(token)
    if not user_id:
        return None
    
    result = (
        supabase.table("users")
        .select("*")
        .eq("id", user_id)
        .execute()
    )

    return result.data[0] if result.data else None
