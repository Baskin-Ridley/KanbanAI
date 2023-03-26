from models import *

def test_class_User_defined():
    assert hasattr(User, '__name__')

def test_class_Kanban_Header_defined():
    assert hasattr(Kanban_Header, '__name__')

def test_class_Kanban_Board_defined():
    assert hasattr(Kanban_Board, '__name__')

def test_class_Kanban_Ticket_defined():
    assert hasattr(Kanban_Ticket, '__name__')