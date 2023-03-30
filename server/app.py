from dotenv import load_dotenv
import os
from flask_mail import Mail, Message
from flask_cors import CORS
from flask import Flask, request, jsonify, session, render_template
from database import db
from models import User
import openai
from controllers import register_user, login, find_user_by_username, get_users, get_user, update_user, delete_user, create_kanban_ticket, get_kanban_tickets, get_kanban_ticket, update_kanban_ticket, delete_kanban_ticket, create_kanban_board, get_kanban_board, get_kanban_boards, update_kanban_board, delete_kanban_board, get_kanban_tickets_by_board, create_kanban_header, register_Super_User, get_kanban_headers_by_board, delete_kanban_header_by_board, get_Notifications, add_member, get_positions_by_board, update_positions_by_board, log_changes, get_members, update_kanban_headers_by_board, get_kanban_boards_with_super, email_from_form,email_from_dashboard,password,change_email_add
# create_user


load_dotenv()
DATABASE_URL = os.environ.get('DATABASE_URL')
FLASK_RUN_PORT = int(os.environ.get('FLASK_RUN_PORT', 5000))
PASSWORD = os.environ.get('PASS')
app = Flask(__name__)
mail = Mail(app)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465 or 587
app.config['MAIL_USERNAME'] = 'app.builtdifferent.info@gmail.com'
app.config['MAIL_PASSWORD'] = PASSWORD
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)
cors = CORS(app)

app.secret_key = os.environ.get('SECRET_KEY')
openai.api_key = os.getenv("OPENAI_API_KEY")

db.init_app(app)


# Remove .env key after project completes: https://platform.openai.com/account/api-keys

# ai routes


@app.route('/notification/<string:super_user_name>', methods=['GET'])
def notification(super_user_name):
    return get_Notifications(super_user_name)


@app.route("/log", methods=['POST'])
def log():
    username = request.get_json()['username']
    body = request.get_json()['body']
    return log_changes(username, body)


@app.route('/ai-test', methods=['POST'])
def ai_test():
    technologies = request.get_json()['technologies']
    test_framework = request.get_json()['test_framework']
    function_to_test = request.get_json()['function_to_test']
    prompt_text = f"Write code for one test only, for this '{technologies}' function, using '{test_framework}' testing technology: '{function_to_test}'./n"
    # prompt_text = "Return the message 'Hello' to this request"
    response = openai.Completion.create(
        # engine="davinci-codex",
        # engine="davinci",
        model="text-davinci-003",
        prompt=prompt_text,
        # max_tokens=100,
        max_tokens=256,
        n=1,
        stop=None,
        temperature=1,
        # temperature=0.5,
    )

    tests_for_function = response.choices[0].text.strip()
    print(tests_for_function)
    return jsonify({'tests_for_function': tests_for_function})

    # response = openai.Completion.create(
    #     model="text-davinci-003",
    #     prompt="The task is to 'create a message app' break down this task into smaller developer tasks for a kanban board. \n",
    #     temperature=1,
    #     max_tokens=256,
    #     top_p=1,
    #     frequency_penalty=0,
    #     presence_penalty=0
    # )


@app.route('/ai-steps', methods=['POST'])
def ai_steps():
    data = request.get_json()
    print(data)
    task = data['task']
    steps = data['steps']
    prompt = f"The task is to {task} break down this task into smaller developer tasks for a kanban board. Number each task 1) 2) etc \n"
    # beginning = data['beginning']
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    print(response)
    steps_for_task = response.choices[0].text
    # print(steps_for_task)
    return jsonify({'steps_for_task': steps_for_task})

# User routes


@ app.route('/register/super_user', methods=['POST'])
def register_super_user_route():
    return register_Super_User()


@ app.route('/super_user/member', methods=['PUT'])
def add_member_to_super():
    return add_member()


@ app.route('/super_user/member/<string:super_user_name>', methods=['GET'])
def get_member_to_super(super_user_name):
    return get_members(super_user_name)


@ app.route('/register/<string:super_user_name>', methods=['POST'])
def register_user_route(super_user_name):
    return register_user(super_user_name)


@ app.route('/login', methods=['POST'])
def login_route():
    return login()

@ app.route('/user/password', methods=['PUT'])
def change_pass():
    return password()

@ app.route('/user/email', methods=['PUT'])
def change_email():
    return change_email_add()

@ app.route('/users', methods=['GET'])
def get_users_route():
    return get_users()


@ app.route('/users/<int:user_id>', methods=['GET'])
def get_user_route(user_id):
    return get_user(user_id)


@ app.route('/users/<string:username>', methods=['GET'])
def find_user_by_username_route(username):
    return find_user_by_username(username)


@ app.route('/users/<int:user_id>', methods=['PUT'])
def update_user_route(user_id):
    return update_user(user_id)


@ app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user_route(user_id):
    return delete_user(user_id)


# Kanban Board routes


@app.route('/users/<int:user_id>/kanban_boards', methods=['GET'])
def get_kanban_boards_route(user_id):
    return get_kanban_boards(user_id)


@app.route('/users/<string:super_user_name>/kanban_boards', methods=['GET'])
def get_kanban_boards_route_with_super(super_user_name):
    return get_kanban_boards_with_super(super_user_name)


@ app.route('/kanban-boards/<int:kanban_board_id>', methods=['GET'])
def get_kanban_board_route(kanban_board_id):
    return get_kanban_board(kanban_board_id)


@ app.route('/kanban-boards/', methods=['POST'])
def create_kanban_board_route():
    return create_kanban_board()


@ app.route('/kanban-boards/<int:kanban_board_id>', methods=['PUT'])
def update_kanban_board_route(kanban_board_id):
    return update_kanban_board(kanban_board_id)


@ app.route('/kanban-boards/<int:kanban_board_id>', methods=['DELETE'])
def delete_kanban_board_route(kanban_board_id):
    return delete_kanban_board(kanban_board_id)


@app.route('/kanban-boards/<int:kanban_board_id>/tickets', methods=['GET'])
def get_kanban_board_tickets_route(kanban_board_id):
    return get_kanban_tickets_by_board(kanban_board_id)


# Kanban Ticket routes

@ app.route('/kanban-tickets', methods=['POST'])
def create_kanban_ticket_route():
    return create_kanban_ticket()


@ app.route('/kanban-tickets', methods=['GET'])
def get_kanban_tickets_route():
    return get_kanban_tickets()


@ app.route('/kanban-tickets/<int:kanban_ticket_id>', methods=['GET'])
def get_kanban_ticket_route(kanban_ticket_id):
    return get_kanban_ticket(kanban_ticket_id)


@ app.route('/kanban-tickets/<int:kanban_ticket_id>', methods=['PUT'])
def update_kanban_ticket_route(kanban_ticket_id):
    return update_kanban_ticket(kanban_ticket_id)


@ app.route('/kanban-tickets/<int:kanban_ticket_id>', methods=['DELETE'])
def delete_kanban_ticket_route(kanban_ticket_id):
    return delete_kanban_ticket(kanban_ticket_id)

# Kanban Header routes


@ app.route('/kanban-board/<int:kanban_board_id>/kanban-headers', methods=['POST'])
def create_kanban_header_route(kanban_board_id):
    return create_kanban_header(kanban_board_id)


@ app.route('/kanban-board/<int:kanban_board_id>/kanban-headers', methods=['GET'])
def get_kanban_headers_by_board_route(kanban_board_id):
    return get_kanban_headers_by_board(kanban_board_id)


@ app.route('/kanban-board/<int:kanban_board_id>/kanban-headers/<int:header_id>', methods=['PUT'])
def update_kanban_headers_by_board_route(kanban_board_id, header_id):
    return update_kanban_headers_by_board(kanban_board_id, header_id)


@ app.route('/kanban-board/<int:kanban_board_id>/kanban-headers/<int:header_id>', methods=['DELETE'])
def delete_kanban_header_by_board_route(kanban_board_id, header_id):
    return delete_kanban_header_by_board(kanban_board_id, header_id)


# Gantt chart fetch for kanban tasks

@app.route('/kanban-board/')
# POSITIONS
@ app.route('/kanban-board/<int:kanban_board_id>/positions', methods=['GET'])
def get_positions_by_board_route(kanban_board_id):
    return get_positions_by_board(kanban_board_id)


@ app.route('/kanban-board/<int:kanban_board_id>/positions', methods=['PUT'])
def update_positions_by_board_route(kanban_board_id):
    return update_positions_by_board(kanban_board_id)


@app.route("/email", methods=['POST'])
def send_email():
    return email_from_form()

@app.route("/dashboard/email", methods=['POST'])
def send_email_dashbaord():
    return email_from_dashboard()

if __name__ == '__main__':
    app.run()
