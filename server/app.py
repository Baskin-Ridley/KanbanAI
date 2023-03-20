from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from database import db
from models import User
from controllers import register_user, find_user_by_username

load_dotenv()
DATABASE_URL = os.environ.get('DATABASE_URL')
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
db.init_app(app)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    user = find_user_by_username(username)

    if user:
        return jsonify({"error": "Username already exists"}), 400

    register_user(username, password)
    return jsonify({"success": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    user = find_user_by_username(username)

    if user and user.check_password(password):
        return jsonify({"success": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401

if __name__ == '__main__':
    app.run()