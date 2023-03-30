from models import *

def test_class_Notification_defined():
    assert hasattr(Notification, '__name__')

def test_class_User_defined():
    assert hasattr(User, '__name__')

def test_class_Super_User_defined():
    assert hasattr(Super_User, '__name__')

def test_class_Kanban_Header_defined():
    assert hasattr(Kanban_Header, '__name__')

def test_class_Kanban_Board_defined():
    assert hasattr(Kanban_Board, '__name__')

def test_class_Positions_defined():
    assert hasattr(Positions, '__name__')

def test_class_Kanban_Ticket_defined():
    assert hasattr(Kanban_Ticket, '__name__')