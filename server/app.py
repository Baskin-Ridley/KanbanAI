from dotenv import load_dotenv
import os
from flask_cors import CORS
from flask import Flask, request, jsonify, session
from database import db
from models import User
import openai
from controllers import register_user, login, find_user_by_username, create_user, get_users, get_user, update_user, delete_user, create_kanban_ticket, get_kanban_tickets, get_kanban_ticket, update_kanban_ticket, delete_kanban_ticket, create_kanban_board, get_kanban_board, get_kanban_boards, update_kanban_board, delete_kanban_board, get_kanban_tickets_by_board


load_dotenv()
DATABASE_URL = os.environ.get('DATABASE_URL')
FLASK_RUN_PORT = int(os.environ.get('FLASK_RUN_PORT', 5000))
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.environ.get('SECRET_KEY')
openai.api_key = os.getenv("OPENAI_API_KEY")

db.init_app(app)


# Remove .env key after project completes: https://platform.openai.com/account/api-keys

# ai routes

@app.route('/ai-test', methods=['POST'])
def ai_test():
    technologies = request.get_json()['technologies']
    test_framework = request.get_json()['test_framework']
    function_to_test = request.get_json()['function_to_test']
    # prompt_text = f"Write one single unit test for this '{technologies}' function using '{test_framework}': '{function_to_test}'."
    prompt_text = "Return the message 'Hello' to this request"
    response = openai.Completion.create(
        #engine="davinci-codex",
        engine="davinci",
        prompt=prompt_text,
        max_tokens=100,
        n=1,
        stop=None,
        temperature=0.5,
    )
    tests_for_function = response.choices[0].text.strip()
    print(tests_for_function)
    return jsonify({'tests_for_function': tests_for_function})


@app.route('/ai-steps', methods=['POST'])
def ai_steps():
    data = request.get_json()
    task = data['task']
    steps = data['steps']
    # beginning = data['beginning']
    response = openai.Completion.create(
        engine="gpt-3.5-turbo",
        prompt=f"The kanban task is `{task}`. Create step-by-step tickets for the kanban board breaking the larger task into smaller tasks",
        max_tokens=5000,
        n=1,
        stop=None,
        temperature=0.8,
    )
    print(response)
    steps_for_task = response.choices[0].text.strip()
    return jsonify({'steps_for_task': steps_for_task})


@ app.route('/register', methods=['POST'])
def register_user_route():
    return register_user()


@ app.route('/login', methods=['POST'])
def login_route():
    return login()


@ app.route('/users', methods=['POST'])
def create_user_route():
    return create_user()


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

@ app.route('/kanban-boards', methods=['POST'])
def create_kanban_board_route():
    return create_kanban_board()


@ app.route('/kanban-boards', methods=['GET'])
def get_kanban_boards_route():
    return get_kanban_boards()


@ app.route('/kanban-boards/<int:kanban_board_id>', methods=['GET'])
def get_kanban_board_route(kanban_board_id):
    return get_kanban_board(kanban_board_id)


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

@app.route('/kanban-tickets/<int:kanban_ticket_id>', methods=['GET'])
def get_kanban_ticket_route(kanban_ticket_id):
    return get_kanban_ticket(kanban_ticket_id)

@ app.route('/kanban-tickets/<int:kanban_ticket_id>', methods=['PUT'])
def update_kanban_ticket_route(kanban_ticket_id):
    return update_kanban_ticket(kanban_ticket_id)

@ app.route('/kanban-tickets/<int:kanban_ticket_id>', methods=['DELETE'])
def delete_kanban_ticket_route(kanban_ticket_id):
    return delete_kanban_ticket(kanban_ticket_id)


if __name__ == '__main__':
    app.run()
