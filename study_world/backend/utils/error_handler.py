'''
utils/error_handler.py
- Global error handling utilities for consistent API error responses
'''
from flask import jsonify

class APIerror(Exception):
    def __init__(self, message, status_code=400):
        self.message = message
        self.status_code = status_code
        super().__init__(message)

def handle_api_error(error):
    response = jsonify({"error": error.message})
    response.status_code = error.status_code
    return response

def handle_generic_code(error):
    response = jsonify({
        "error": "Internal server error",
        "details": str(error)
    })
    response.status_code = 500
    return response