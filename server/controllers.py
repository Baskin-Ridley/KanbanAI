from models import User
from database import db

def register_user(username, password, name, role, email):
    user = User(username=username, password=password, name=name, role=role, email=email)
    db.session.add(user)
    db.session.commit()

def find_user_by_username(username):
    return User.query.filter_by(username=username).first()
