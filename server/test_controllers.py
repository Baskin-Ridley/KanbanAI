from controllers import *
import json


# User controller tests

def test_register_user():
    assert callable(register_user)

def test_login():
    assert callable(login)

def test_create_user():
    assert callable(create_user)

def test_get_users():
    assert callable(get_users)

def test_get_user():
    assert callable(get_user)

def test_find_user_by_username():
    assert callable(find_user_by_username)

def test_update_user():
    assert callable(update_user)

def test_delete_user():
    assert callable(delete_user)


# Kanban_Board controller tests

def test_create_kanban_board():
    assert callable(create_kanban_board)

def test_get_kanban_boards():
    assert callable(get_kanban_boards)

def test_get_kanban_board():
    assert callable(get_kanban_board)

def test_update_kanban_board():
    assert callable(update_kanban_board)

def test_delete_kanban_board():
    assert callable(delete_kanban_board)


# Kanban Ticket controller tests

def test_create_kanban_ticket():
    assert callable(create_kanban_ticket)

def test_get_kanban_tickets():
    assert callable(get_kanban_tickets)

def test_get_kanban_tickets_by_board():
    assert callable(get_kanban_tickets_by_board)

def test_get_kanban_ticket():
    assert callable(get_kanban_ticket)

def test_update_kanban_ticket():
    assert callable(update_kanban_ticket)

def test_delete_kanban_ticket():
    assert callable(delete_kanban_ticket)
