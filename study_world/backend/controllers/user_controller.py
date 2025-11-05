'''
controllers/user_controller.py
- Implements logic for authentication, registration, profile updates, and user queries
'''

from config.supabase_client import supabase
from utils.error_handler import handle_api_error
from utils.auth_utils import create_token
from datetime import datetime, timedelta

def get_all_users():
    pass

def get_user_by_id(user_id):
    pass

def create_user(data):
    pass

def update_user(user_id, data):
    pass

def delete_user(user_id):
    pass

def add_xp(user_id, xp_earned):
    pass

def update_level(user_id, new_level):
    pass

def update_coins(user_id, coins_change):
    pass

def update_streak(user_id, last_study_date=None):
    pass

def authenticate_user(email, password):
    pass