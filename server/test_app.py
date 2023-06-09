import app

def test_functions_exist():
    assert hasattr(app, 'register_user')
    assert hasattr(app, 'login')
    assert hasattr(app, 'find_user_by_username')
    assert hasattr(app, 'create_user')
    assert hasattr(app, 'get_users')
    assert hasattr(app, 'get_user')
    assert hasattr(app, 'update_user')
    assert hasattr(app, 'delete_user')
    assert hasattr(app, 'create_kanban_ticket')
    assert hasattr(app, 'get_kanban_tickets')
    assert hasattr(app, 'get_kanban_ticket')
    assert hasattr(app, 'update_kanban_ticket')
    assert hasattr(app, 'delete_kanban_ticket')
    assert hasattr(app, 'create_kanban_board')
    assert hasattr(app, 'get_kanban_board')
    assert hasattr(app, 'get_kanban_boards')
    assert hasattr(app, 'update_kanban_board')
    assert hasattr(app, 'delete_kanban_board')
    assert hasattr(app, 'get_kanban_tickets_by_board')
