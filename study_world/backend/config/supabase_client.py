'''
config/supabase_client.py
- Initializes and exports a single Supabase client instance
- Used by controllers or services to interact with the Supabase database
'''
from supabase import create_client
from config.settings import SUPABASE_URL, SUPABASE_KEY

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
