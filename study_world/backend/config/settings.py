'''
config/settings.py
- Loads environment variables from .env using python-dotenv
- Stores sensitive keys (Supabase URL, API keys, Flask SECRET_KEY, etc...)
- Provides global config ariables used throughout the backend
'''

from dotenv import load_dotenv
import os

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = os.getenv("DEBUG", "False").lower() == "true"