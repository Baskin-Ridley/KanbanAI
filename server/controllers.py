from models import User
from flask import jsonify, request, current_app
from models import db, User, Kanban_Board, Kanban_Ticket
import jwt
import datetime

# User controller

def check_authentication():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authentication failed'}), 401
    token = auth_header.split(' ')[1]
    try:
        data = jwt.decode(token, current_app.config.get('JWT_SECRET_KEY'), algorithms=["HS256"])
        if isinstance(data, str):
            username = data
        else:
            username = data['username']
        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify({'message': 'Authentication failed'}), 401
        else:
            return jsonify({'message': 'Authentication successful'}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

def register_user():
    username = request.json.get('username')
    name = request.json.get('name')
    password = request.json.get('password')
    role = request.json.get('role')
    email = request.json.get('email')
    avatar = request.json.get('avatar')
    if not username or not name or not password or not role or not email:
        return jsonify({'message': 'Missing required fields'}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400
    user = User(username=username, name=name, password=password, role=role, email=email, avatar=avatar)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully!'}), 201

def login():
    # check if user is already authenticated
    auth_header = request.headers.get('Authorization')
    if auth_header:
        token = auth_header.split(' ')[1]
        try:
            data = jwt.decode(token, current_app.config.get('JWT_SECRET_KEY'), algorithms=["HS256"])
            username = data['username']
            user = User.query.filter_by(username=username).first()
            if user:
                # update existing token with new expiration time
                expiration = datetime.utcnow() + timedelta(minutes=30)
                token = jwt.encode({'username': username, 'exp': expiration}, current_app.config.get('JWT_SECRET_KEY'), algorithm='HS256')
                return jsonify({'token': token}), 200
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
            pass
    # authenticate user
    username = request.json.get('username')
    password = request.json.get('password')
    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({'message': 'Invalid username or password'}), 401
    # generate token
    expiration = datetime.utcnow() + timedelta(minutes=30)
    token = jwt.encode({'username': username, 'exp': expiration}, current_app.config.get('JWT_SECRET_KEY'), algorithm='HS256')
    return jsonify({'token': token}), 200

def logout():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authentication failed'}), 401
    token = auth_header.split(' ')[1]
    try:
        data = jwt.decode(token, current_app.config.get('JWT_SECRET_KEY'), algorithms=["HS256"])
        user_id = User.query.filter_by(username=data['username']).first().id
        logout_time = datetime.datetime.utcnow()
        user = User.query.filter_by(id=user_id).first()
        user.last_logout_time = logout_time
        db.session.commit()
        return jsonify({'message': 'Logout successful!'})
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

def create_user():
    username = request.json.get('username')
    name = request.json.get('name')
    password = request.json.get('password')
    role = request.json.get('role')
    email = request.json.get('email')
    avatar = request.json.get('avatar')
    user = User(username=username, name=name, password=password, role=role, email=email, avatar=avatar)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully!'}), 201

def get_users():
    users = User.query.all()
    return jsonify(users)

def get_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return jsonify({'message': 'User not found'})
    else:
        return jsonify(user)
    
def find_user_by_username(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        return jsonify({'message': 'User not found'}), 404
    else:
        return jsonify(user), 200

def update_user(user_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authentication failed'}), 401
    token = auth_header.split(' ')[1]
    try:
        data = jwt.decode(token, current_app.config.get('JWT_SECRET_KEY'), algorithms=["HS256"])
        if isinstance(data, str):
            username = data
        else:
            username = data['username']
        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify({'message': 'Authentication failed'}), 401
        if user.id != user_id:
            return jsonify({'message': 'You are not authorized to update this user'}), 401
        username = request.json.get('username')
        name = request.json.get('name')
        password = request.json.get('password')
        role = request.json.get('role')
        email = request.json.get('email')
        avatar = request.json.get('avatar')
        user.username = username
        user.name = name
        user.password = password
        user.role = role
        user.email = email
        user.avatar = avatar
        db.session.commit()
        return jsonify({'message': 'User updated successfully!'})
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

def delete_user(user_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authentication failed'}), 401
    token = auth_header.split(' ')[1]
    try:
        data = jwt.decode(token, current_app.config.get('JWT_SECRET_KEY'), algorithms=["HS256"])
        username = data['username']
        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify({'message': 'Authentication failed'}), 401
        if user.id != user_id:
            return jsonify({'message': 'You are not authorized to delete this user'}), 401
        user = User.query.filter_by(id=user_id).first()
        if user is None:
            return jsonify({'message': 'User not found'})
        else:
            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': 'User deleted successfully!'})
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

# Kanban_Board controller

def create_kanban_board():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authentication failed'}), 401
    token = auth_header.split(' ')[1]
    try:
        data = jwt.decode(token, current_app.config.get('JWT_SECRET_KEY'), algorithms=["HS256"])
        user_id = User.query.filter_by(username=data['username']).first().id
        start_time = request.json.get('start_time')
        end_time = request.json.get('end_time')
        kanban_board = Kanban_Board(user_id=user_id, start_time=start_time, end_time=end_time)
        db.session.add(kanban_board)
        db.session.commit()
        return jsonify({'message': 'Kanban board created successfully!'}), 201
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

def get_kanban_boards():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authentication failed'}), 401
    token = auth_header.split(' ')[1]
    try:
        data = jwt.decode(token, current_app.config.get('JWT_SECRET_KEY'), algorithms=["HS256"])
        user_id = User.query.filter_by(username=data['username']).first().id
        kanban_boards = Kanban_Board.query.filter_by(user_id=user_id).all()
        return jsonify(kanban_boards)
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

def get_kanban_board(kanban_board_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authentication failed'}), 401
    token = auth_header.split(' ')[1]
    try:
        data = jwt.decode(token, current_app.config.get('JWT_SECRET_KEY'), algorithms=["HS256"])
        user_id = User.query.filter_by(username=data['username']).first().id
        kanban_board = Kanban_Board.query.filter_by(id=kanban_board_id, user_id=user_id).first()
        if kanban_board is None:
            return jsonify({'message': 'Kanban board not found'})
        else:
            return jsonify(kanban_board)
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

def update_kanban_board(kanban_board_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authentication failed'}), 401
    token = auth_header.split(' ')[1]
    try:
        data = jwt.decode(token, current_app.config.get('JWT_SECRET_KEY'), algorithms=["HS256"])
        user_id = data['user_id']
        kanban_board = Kanban_Board.query.filter_by(id=kanban_board_id, user_id=user_id).first()
        if kanban_board is None:
            return jsonify({'message': 'Kanban board not found'}), 404
        else:
            start_time = request.json.get('start_time')
            end_time = request.json.get('end_time')
            kanban_board.start_time = start_time
            kanban_board.end_time = end_time
            db.session.commit()
            return jsonify({'message': 'Kanban board updated successfully!'}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

def delete_kanban_board(kanban_board_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authentication failed'}), 401
    token = auth_header.split(' ')[1]
    try:
        data = jwt.decode(token, current_app.config.get('JWT_SECRET_KEY'), algorithms=["HS256"])
        user_id = data['user_id']
        kanban_board = Kanban_Board.query.filter_by(id=kanban_board_id, user_id=user_id).first()
        if kanban_board is None:
            return jsonify({'message': 'Kanban board not found'}), 404
        else:
            db.session.delete(kanban_board)
            db.session.commit()
            return jsonify({'message': 'Kanban board deleted successfully!'}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

# Kanban Ticket controller

def create_kanban_ticket():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authentication failed'}), 401
    token = auth_header.split(' ')[1]
    try:
        data = jwt.decode(token, current_app.config.get('JWT_SECRET_KEY'), algorithms=["HS256"])
        user_id = data.get('user_id')
        title = request.json.get('title')
        content = request.json.get('content')
        start_time = request.json.get('start_time')
        end_time = request.json.get('end_time')
        ticket_status = request.json.get('ticket_status')
        kanban_board_id = request.json.get('kanban_board_id')
        kanban_ticket = Kanban_Ticket(title=title, content=content, user_id=user_id, start_time=start_time, end_time=end_time, ticket_status=ticket_status, kanban_board_id=kanban_board_id)
        db.session.add(kanban_ticket)
        db.session.commit()
        return jsonify({'message': 'Kanban ticket created successfully!'}), 201
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

def get_kanban_tickets():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authentication failed'}), 401
    token = auth_header.split(' ')[1]
    try:
        data = jwt.decode(token, current_app.config.get('JWT_SECRET_KEY'), algorithms=["HS256"])
        user_id = data.get('user_id')
        kanban_tickets = Kanban_Ticket.query.filter_by(user_id=user_id).all()
        return jsonify(kanban_tickets)
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

def get_kanban_ticket(kanban_ticket_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authentication failed'}), 401
    token = auth_header.split(' ')[1]
    try:
        data = jwt.decode(token, current_app.config.get('JWT_SECRET_KEY'), algorithms=["HS256"])
        user_id = data.get('user_id')
        kanban_ticket = Kanban_Ticket.query.filter_by(id=kanban_ticket_id, user_id=user_id).first()
        if kanban_ticket is None:
            return jsonify({'message': 'Kanban ticket not found'}), 404
        else:
            return jsonify(kanban_ticket)
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

def update_kanban_ticket(kanban_ticket_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authentication failed'}), 401
    token = auth_header.split(' ')[1]
    try:
        data = jwt.decode(token, current_app.config.get('JWT_SECRET_KEY'), algorithms=["HS256"])
        user_id = data['sub']
        kanban_ticket = Kanban_Ticket.query.filter_by(id=kanban_ticket_id, user_id=user_id).first()
        if kanban_ticket is None:
            return jsonify({'message': 'Kanban ticket not found'}), 404
        else:
            title = request.json.get('title')
            content = request.json.get('content')
            start_time = request.json.get('start_time')
            end_time = request.json.get('end_time')
            ticket_status = request.json.get('ticket_status')
            kanban_board_id = request.json.get('kanban_board_id')
            if title:
                kanban_ticket.title = title
            if content:
                kanban_ticket.content = content
            if start_time:
                kanban_ticket.start_time = start_time
            if end_time:
                kanban_ticket.end_time = end_time
            if ticket_status:
                kanban_ticket.ticket_status = ticket_status
            if kanban_board_id:
                kanban_ticket.kanban_board_id = kanban_board_id
            db.session.commit()
            return jsonify({'message': 'Kanban ticket updated successfully!'})
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

def delete_kanban_ticket(kanban_ticket_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Authentication failed'}), 401
    token = auth_header.split(' ')[1]
    try:
        data = jwt.decode(token, current_app.config.get('JWT_SECRET_KEY'), algorithms=["HS256"])
        user_id = data['sub']
        kanban_ticket = Kanban_Ticket.query.filter_by(id=kanban_ticket_id, user_id=user_id).first()
        if kanban_ticket is None:
            return jsonify({'message': 'Kanban ticket not found'}), 404
        else:
            db.session.delete(kanban_ticket)
            db.session.commit()
            return jsonify({'message': 'Kanban ticket deleted successfully!'})
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

