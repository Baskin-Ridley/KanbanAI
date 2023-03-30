from app import app
import pytest
import json
from app import *

def test_notification():
    assert callable(notification)

def test_log():
    assert callable(log)

def test_ai_test():
    assert callable(ai_test)

def test_ai_steps():
    assert callable(ai_steps)

def test_register_super_user_route():
    assert callable(register_super_user_route)

def test_add_member_to_super():
    assert callable(add_member_to_super)

def test_get_member_to_super():
    assert callable(get_member_to_super)

def test_register_user_route():
    assert callable(register_user_route)

def test_login_route():
    assert callable(login_route)

def test_get_users_route():
    assert callable(get_users_route)

def test_get_user_route():
    assert callable(get_user_route)

def test_find_user_by_username_route():
    assert callable(find_user_by_username_route)

def test_update_user_route():
    assert callable(update_user_route)

def test_delete_user_route():
    assert callable(delete_user_route)

def test_get_kanban_boards_route():
    assert callable(get_kanban_boards_route)

def test_get_kanban_boards_route_with_super():
    assert callable(get_kanban_boards_route_with_super)

def test_get_kanban_board_route():
    assert callable(get_kanban_board_route)

def test_create_kanban_board_route():
    assert callable(create_kanban_board_route)

def test_update_kanban_board_route():
    assert callable(update_kanban_board_route)

def test_delete_kanban_board_route():
    assert callable(delete_kanban_board_route)

def test_get_kanban_board_tickets_route():
    assert callable(get_kanban_board_tickets_route)

def test_create_kanban_ticket_route():
    assert callable(create_kanban_ticket_route)

def test_get_kanban_tickets_route():
    assert callable(get_kanban_tickets_route)

def test_get_kanban_ticket_route():
    assert callable(get_kanban_ticket_route)

def test_update_kanban_ticket_route():
    assert callable(update_kanban_ticket_route)

def test_delete_kanban_ticket_route():
    assert callable(delete_kanban_ticket_route)

def test_create_kanban_header_route():
    assert callable(create_kanban_header_route)

def test_get_kanban_headers_by_board_route():
    assert callable(get_kanban_headers_by_board_route)

def test_update_kanban_headers_by_board_route():
    assert callable(update_kanban_headers_by_board_route)

def test_delete_kanban_header_by_board_route():
    assert callable(delete_kanban_header_by_board_route)

def test_get_positions_by_board_route():
    assert callable(get_positions_by_board_route)

def test_update_positions_by_board_route():
    assert callable(update_positions_by_board_route)

def test_send_email():
    assert callable(send_email)

# def test_functions_exist():
#     assert hasattr(get_members)
#     assert hasattr(app, 'add_member')
#     assert hasattr(app, 'register_Super_User')
#     assert hasattr(app, 'log_changes')
#     assert hasattr(app, 'get_Notifications')
#     assert hasattr(app, 'get_kanban_boards_with_super')
#     assert hasattr(app, 'create_kanban_header')
#     assert hasattr(app, 'get_kanban_headers_by_board')
#     assert hasattr(app, 'update_kanban_headers_by_board')
#     assert hasattr(app, 'delete_kanban_header_by_board')
#     assert hasattr(app, 'get_positions_by_board')
#     assert hasattr(app, 'update_positions_by_board')
#     assert hasattr(app, 'email_from_form')
#     assert hasattr(app, 'register_user')
#     assert hasattr(app, 'login')
#     assert hasattr(app, 'find_user_by_username')
#     assert hasattr(app, 'get_users')
#     assert hasattr(app, 'get_user')
#     assert hasattr(app, 'update_user')
#     assert hasattr(app, 'delete_user')
#     assert hasattr(app, 'create_kanban_ticket')
#     assert hasattr(app, 'get_kanban_tickets')
#     assert hasattr(app, 'get_kanban_ticket')
#     assert hasattr(app, 'update_kanban_ticket')
#     assert hasattr(app, 'delete_kanban_ticket')
#     assert hasattr(app, 'create_kanban_board')
#     assert hasattr(app, 'get_kanban_board')
#     assert hasattr(app, 'get_kanban_boards')
#     assert hasattr(app, 'update_kanban_board')
#     assert hasattr(app, 'delete_kanban_board')
#     assert hasattr(app, 'get_kanban_tickets_by_board')

def test_ai_test():
    test_client = app.test_client()
    sample_request_data = {
        'technologies': 'Python',
        'test_framework': 'pytest',
        'function_to_test': 'def add(a, b): return a + b'
    }
    response = test_client.post(
        '/ai-test',
        data=json.dumps(sample_request_data),
        content_type='application/json'
    )
    assert response.status_code == 200
    response_data = json.loads(response.data)
    assert 'tests_for_function' in response_data
    assert response_data['tests_for_function'] != ""

def test_ai_steps():
    test_client = app.test_client()

    sample_request_data = {
        'task': 'implement a user registration system',
        'steps': 'design, development, testing'
    }

    response = test_client.post(
        '/ai-steps',
        data=json.dumps(sample_request_data),
        content_type='application/json'
    )

    assert response.status_code == 200
    response_data = json.loads(response.data)
    assert 'steps_for_task' in response_data
    assert response_data['steps_for_task'] != ""
