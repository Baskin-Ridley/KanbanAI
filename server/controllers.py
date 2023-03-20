from models import User
from database import db

def register_user(username, password):
    user = User(username=username, password=password)
    db.session.add(user)
    db.session.commit()

def find_user_by_username(username):
    return User.query.filter_by(username=username).first()
