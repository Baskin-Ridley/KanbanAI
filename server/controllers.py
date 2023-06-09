from models import User
from flask import jsonify, request
from models import User, Super_User, Kanban_Board, Kanban_Ticket, Kanban_Header, Notification, Positions
from database import db
from datetime import datetime
from mail import *
from flask_mail import Mail, Message
from flask import Flask
from datetime import datetime


email = Flask(__name__)
mail = Mail(email)

email.config['MAIL_SERVER'] = 'smtp.gmail.com'
email.config['MAIL_PORT'] = 465 or 587
email.config['MAIL_USERNAME'] = 'app.builtdifferent@gmail.com'
email.config['MAIL_PASSWORD'] = "ntapobukehzgjomg"
email.config['MAIL_USE_TLS'] = False
email.config['MAIL_USE_SSL'] = True

# notification Controller


def get_Notifications(super_user_name):
    list = []
    data = Notification.query.filter_by(super_user_name=[[super_user_name]])

    for item in data:
        print(item)

        note = {
            "content": item.content,
            "member": item.user_name
        }
        list.append(note)

    return list, 200

# Super User Controller


def register_Super_User():
    data = request.get_json()
    username = data.get('username')
    name = data.get('name')
    password = data.get('password')
    role = data.get('role')
    email = data.get('email')
    members = data.get('members')
    if not username or not name or not password or not role or not email:
        return jsonify({'error': 'Missing parameters'}), 400
    if Super_User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 400
    super_user = Super_User(username=username, name=name, password=password,
                            role=role, email=email, members=members)
    db.session.add(super_user)
    db.session.commit()
    return jsonify({'message': 'Super-User created successfully'}), 201


def register_user(super_user_name):
    data = request.get_json()
    username = data.get('username')
    name = data.get('name')
    password = data.get('password')
    role = data.get('role')
    email = data.get('email')
    avatar = data.get('avatar')

    if not username or not name or not password or not role or not email:
        return jsonify({'error': 'Missing parameters'}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 400
    user = User(username=username, name=name, password=password,
                role=role, email=email, avatar=avatar, supervisors=[super_user_name])
    db.session.add(user)

    super_user = Super_User.query.filter_by(username=super_user_name).first()
    super_user.members = super_user.members + [user.username]

    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201


# add members to the admins
def add_member():
    data = request.get_json()
    new_members = data.get('new_member')
    super_user = data.get('super_user')

    if not new_members or not super_user:
        return jsonify({'error': 'super_user invalid'}), 404

    # add admin to members
    for member in new_members:
        print(member)
        if check_user_name(member) == False:
            return jsonify({'error': f'{member} does not exist'}), 404
        temp_user = User.query.filter_by(username=member).first()
        temp_user.supervisors = list(set(temp_user.supervisors + [super_user]))

    user = Super_User.query.filter_by(username=super_user).first()
    if not user:
        return jsonify({'error': f'{super_user} does not exist'}), 404
    if user.members is None:
        user.members = []

    user.members = list(
        set(list(map(str, user.members)) + list(map(str, new_members))))

    db.session.commit()

    return jsonify({'message': 'members added to the database'}), 201


def get_members(super_user_name):
    list_members = []
    user = Super_User.query.filter_by(username=super_user_name).first()

    if not user:
        return ({'error': f"{super_user_name} not found"}), 404

    for item in user.members:
        member = User.query.filter_by(username=item).first()

        member_data = {
            'username': member.username,
            'avatar': member.avatar,
            'email': member.email,
            'supervisors': member.supervisors
        }

        list_members.append(member_data)

    return jsonify(list_members), 200


def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Missing parameters'}), 400
    user = User.query.filter_by(username=username).first()
    if not user:
        user = Super_User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid username or password'}), 401

    # check wether it is a super_user or not
    if user.isSuper:
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'name': user.name,
            'members': user.members,
            'isSuper': True
        }
    else:
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'name': user.name,
            'isSuper': False
        }

    body = f"logged in at time: {datetime.utcnow().replace(microsecond=0)}"
    log_changes(user.username, body)
    return jsonify(user_data), 200


def password():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if user:
        user.password = password
    else:
        user = Super_User.query.filter_by(username=username).first()
        user.password = password

    db.session.commit()
    return jsonify({'message': "password changed!"}), 200


def change_email_add():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")

    user = User.query.filter_by(username=username).first()
    if user:
        user.email = email
    else:
        user = Super_User.query.filter_by(username=username).first()
        user.email = email

    db.session.commit()


# return jsonify({'message': "email changed!"}), 200


def get_users():
    users = User.query.all()
    users_list = []
    for user in users:
        user_dict = {}
        user_dict['id'] = user.id
        user_dict['username'] = user.username
        user_dict['name'] = user.name
        user_dict['role'] = user.role
        user_dict['email'] = user.email
        user_dict['avatar'] = user.avatar
        users_list.append(user_dict)
    return jsonify({'users': users_list}), 200


def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    user_dict = {}
    user_dict['id'] = user.id
    user_dict['username'] = user.username
    user_dict['name'] = user.name
    user_dict['role'] = user.role
    user_dict['email'] = user.email
    user_dict['avatar'] = user.avatar
    return jsonify({'user': user_dict}), 200


def find_user_by_username(username):
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({"message": "User not found"}), 404


def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    data = request.get_json()
    if "username" in data:
        user.username = data["username"]
    if "name" in data:
        user.name = data["name"]
    if "password" in data:
        user.password = data["password"]
    if "role" in data:
        user.role = data["role"]
    if "email" in data:
        user.email = data["email"]
    if "avatar" in data:
        user.avatar = data["avatar"]
    db.session.commit()
    return jsonify(user.serialize()), 200


def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

# Kanban_Board controller


def get_kanban_boards_with_super(super_user_name):
    user_list = []
    users = User.query.filter(User.supervisors.any(super_user_name)).all()

    for user in users:
        new_user = {
            "user_id": user.id,
            "user_name": user.name,
            "user_avatar": user.avatar,
            "user_email": user.email,
            "kanban_boards": []
        }

        user_boards = Kanban_Board.query.filter_by(user_id=user.id).all()

        for board in user_boards:
            new_board = {
                "board_id": board.id,
                "board_name": board.name,
                "board_start": board.start_time
                # add any other relevant fields for the board here
            }
            new_user["kanban_boards"].append(new_board)

        user_list.append(new_user)

    return jsonify(user_list), 200


def create_kanban_board():
    data = request.get_json()
    user_id = request.json.get('user_id')
    start_time = datetime.utcnow()
    end_time = None
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    kanban_board = Kanban_Board(
        user_id=user_id, name=data['name'], start_time=start_time, end_time=end_time)
    db.session.add(kanban_board)
    db.session.commit()

    body = f"created a kanban board at time: {datetime.utcnow().replace(microsecond=0)}"
    # log_changes(user.username, body)

    return jsonify(kanban_board.serialize()), 201


def get_kanban_boards(user_id):
    kanban_boards = Kanban_Board.query.filter_by(user_id=user_id).all()
    return jsonify([kanban_board.serialize() for kanban_board in kanban_boards]), 200


def get_kanban_board(kanban_board_id):
    kanban_board = Kanban_Board.query.get(kanban_board_id)
    if not kanban_board:
        return jsonify({'error': 'Kanban board not found'}), 404
    return jsonify(kanban_board.serialize()), 200


def update_kanban_board(kanban_board_id):
    kanban_board = Kanban_Board.query.filter_by(id=kanban_board_id).first()
    if kanban_board is None:
        return jsonify({'error': 'Kanban board not found.'}), 404
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided.'}), 400
    if 'user_id' in data:
        kanban_board.user_id = data['user_id']
    if 'start_time' in data:
        kanban_board.start_time = data['start_time']
    if 'end_time' in data:
        kanban_board.end_time = data['end_time']
    db.session.commit()
    return jsonify({'success': 'Kanban board updated successfully.'})


def delete_kanban_board(kanban_board_id):
    kanban_board = Kanban_Board.query.get(kanban_board_id)
    if kanban_board is None:
        return jsonify({'error': 'Kanban board not found.'}), 404
    db.session.delete(kanban_board)
    db.session.commit()
    return jsonify({'success': 'Kanban board deleted successfully.'})

# Kanban Ticket controller


def create_kanban_ticket():
    data = request.json
    ticket = Kanban_Ticket(
        title=data['title'],
        content=data['content'],
        user_id=data['user_id'],
        start_time=data['start_time'],
        header_id=data['header_id'],
        ticket_status=data['ticket_status'],
        test_technologies=data['test_technologies'],
        test_testing_framework=data['test_testing_framework'],
        test_function=data['test_function'],
        kanban_board_id=data['kanban_board_id']
    )
    db.session.add(ticket)
    db.session.commit()
    return jsonify({'message': 'Kanban Ticket created successfully', 'ticket': ticket.serialize()}), 201


def get_kanban_tickets():
    tickets = Kanban_Ticket.query.all()
    return jsonify([ticket.serialize() for ticket in tickets]), 200


def get_kanban_tickets_by_board(kanban_board_id):
    tickets = Kanban_Ticket.query.filter_by(kanban_board_id=kanban_board_id)
    return jsonify([ticket.serialize() for ticket in tickets]), 200


def get_kanban_ticket(kanban_ticket_id):
    ticket = Kanban_Ticket.query.filter_by(id=kanban_ticket_id).first()
    if ticket is not None:
        return jsonify(ticket.serialize()), 200
    return jsonify({'message': 'Kanban Ticket not found'}), 404


def update_kanban_ticket(kanban_ticket_id):
    ticket = Kanban_Ticket.query.get(kanban_ticket_id)
    kanban_admin = "app.builtdifferent.info@gmail.com"
    kanban_scram_master = "app.builtdifferent.info@gmail.com"
    if not ticket:
        return jsonify({'error': 'Kanban ticket not found'}), 404
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No input data provided'}), 400
    if 'title' in data:
        ticket.title = data['title']
    if 'content' in data:
        ticket.content = data['content']
    if 'user_id' in data:
        ticket.user_id = data['user_id']
    if 'start_time' in data:
        ticket.start_time = data['start_time']
    if 'end_time' in data:
        ticket.end_time = data['end_time']
    # Test functionality
    if 'test_technologies' in data:
        ticket.test_technologies = data['test_technologies']
    if 'test_testing_framework' in data:
        ticket.test_testing_framework = data['test_testing_framework']
    if 'test_function' in data:
        ticket.test_function = data['test_function']
    if 'test_generated_test' in data:
        ticket.test_generated_test = data['test_generated_test']

    if (ticket.ticket_status != data['ticket_status'] and data['ticket_status'] == "closed"):
        user_name = User.query.get(ticket.user_id)
        sendMail(kanban_admin, ticket.title, "closed", user_name, "", "", "")
    if (ticket.ticket_status != data['ticket_status'] and data['ticket_status'] == "blocked"):
        user_name = User.query.get(ticket.user_id)
        sendMail(kanban_scram_master, ticket.title,
                 "blocked", user_name, "", "", "")

    if 'ticket_status' in data:
        ticket.ticket_status = data['ticket_status']
    if 'kanban_board_id' in data:
        ticket.kanban_board_id = data['kanban_board_id']

    db.session.commit()

    return jsonify(ticket.serialize()), 200


def delete_kanban_ticket(kanban_ticket_id):
    ticket = Kanban_Ticket.query.get(kanban_ticket_id)
    if not ticket:
        return jsonify({'error': 'Kanban ticket not found'}), 404
    db.session.delete(ticket)
    db.session.commit()
    return jsonify({'message': 'Kanban ticket deleted successfully'}), 200


# Kanban Header

def create_kanban_header(kanban_board_id):
    data = request.json
    header = Kanban_Header(
        name=data['name'],
        kanban_board_id=kanban_board_id
    )
    db.session.add(header)
    db.session.commit()
    return jsonify({'message': 'Kanban Header created successfully', 'header': header.serialize()}), 201


def get_kanban_headers_by_board(kanban_board_id):
    headers = Kanban_Header.query.filter_by(kanban_board_id=kanban_board_id)
    return jsonify([header.serialize() for header in headers]), 200


def update_kanban_headers_by_board(kanban_board_id, header_id):
    header = Kanban_Header.query.get(header_id)
    if not header:
        return jsonify({'error': 'Kanban header not found'}), 404
    data = request.get_json()
    if 'name' in data:
        header.name = data['name']
    db.session.commit()
    return jsonify({'success': f'Kanban header updated successfully with the new name: {header.name}.'})


def delete_kanban_header_by_board(kanban_board_id, header_id):
    header = Kanban_Header.query.get(header_id)
    if not header:
        return jsonify({'error': 'Kanban header not found'}), 404
    db.session.delete(header)
    db.session.commit()
    return jsonify({'message': 'Kanban header deleted successfully'}), 200

# POSITIONS:


def get_positions_by_board(kanban_board_id):
    positions = Positions.query.filter_by(board_id=kanban_board_id)
    # return jsonify({"positions": positions.position_data})
    return jsonify([position.serialize() for position in positions]), 200


def update_positions_by_board(kanban_board_id):
    board = Kanban_Board.query.filter_by(id=kanban_board_id).first()
    positions_data = request.get_json().get('positions')
    if board.positions:
        board.positions.position_data = positions_data
    else:
        new_positions = Positions(
            kanban_board=board, position_data=positions_data)
        db.session.add(new_positions)
    db.session.commit()
    return jsonify({'success': 'Kanban board POSITIONS updated successfully.'})


# checker functions:

def check_user_name(username):
    temp = User.query.filter_by(username=username).first()
    if not temp:
        return False
    else:
        return True


def log_changes(username, body):
    temp = User.query.filter_by(username=username).first()
    if not hasattr(temp, "supervisors"):
        return
    notification = Notification(
        content=body,
        user_name=username,
        super_user_name=[temp.supervisors]
    )
    db.session.add(notification)
    db.session.commit()
    return jsonify({"message": "changes added"})


def email_from_form():
    data = request.get_json()
    body = data.get("body")
    customer = data.get("email")
    person = data.get("person")
    company = data.get("company")

    print(customer, person, company)
    try:
        sendMail("app.builtdifferent.info@gmail.com",
                 " ", "", " ", body, "", "")
        sendMail(customer, " ", "customer", "", "", person, company)
        return 'Sent', 200
    except Exception as e:
        return jsonify(e), 400


def email_from_dashboard():
    data = request.get_json()
    body = data.get("body")
    receiver = data.get("email")

    try:
        sendMail(receiver, " ", "", "", body, "", "")
        return 'Sent', 200
    except Exception as e:
        return jsonify(e), 400
