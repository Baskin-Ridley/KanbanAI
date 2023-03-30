from app import app
from database import db
from models import User, Kanban_Board, Kanban_Ticket, Kanban_Header, Super_User, Notification
from datetime import datetime, timedelta
import os
import sys
import json
import pytest


def test_database_init():
    with app.app_context():

        # Drop all tables if they already exist
        db.drop_all()
        # Create the tables
        db.create_all()

        # creat notification
        notification = Notification(
            user_name="user1",
            content="test content",
            super_user_name=[["admin1"]]
        )
        db.session.add(notification)
        notification2 = Notification(
            user_name="user1",
            content="test content 2",
            super_user_name=[["admin1"]]
        )
        db.session.add(notification2)
        notification3 = Notification(
            user_name="user1",
            content="test content 3",
            super_user_name=[["admin1"]]
        )
        db.session.add(notification3)

        # Commit the notifications
        db.session.commit()

        # Add some users

        user1 = User(
            username="user1",
            name="User One",
            password="password1",
            role="leader",
            email="user1@example.com",
            avatar="avatar1.png",
            supervisors=['admin1'],
            isSuper=False
        )
        db.session.add(user1)

        user2 = User(
            username="user2",
            name="User Two",
            password="password2",
            role="user",
            email="user2@example.com",
            avatar="avatar2.png",
            supervisors=['admin1'],
            isSuper=True
        )
        db.session.add(user2)

        user3 = User(
            username="user3",
            name="User Three",
            password="password3",
            role="user",
            email="user3@example.com",
            avatar="avatar3.png",
            supervisors=['admin1'],
            isSuper=False
        )
        db.session.add(user3)

        # Commit the users
        db.session.commit()

        # Add some Kanban boards

        board1 = Kanban_Board(
            user_id=user1.id, name='First Project', start_time=datetime.utcnow(), board_users=[1, 2, 3, 4])

        db.session.add(board1)

        board2 = Kanban_Board(
            user_id=user1.id,
            name='Second Project',
            start_time=datetime.utcnow() - timedelta(days=5),
            end_time=datetime.utcnow() - timedelta(days=1),
            board_users=[1, 2, 3, 4]
        )
        db.session.add(board2)

        board3 = Kanban_Board(
            user_id=user2.id, name='Third Project', start_time=datetime.utcnow())
        db.session.add(board3)

        # Commmit the boards
        db.session.commit()

        # Add some Kanban Headers

        header1 = Kanban_Header(
            name="Header 1",
            kanban_board_id=board1.id
        )

        db.session.add(header1)

        header2 = Kanban_Header(
            name="Header 2",
            kanban_board_id=board1.id
        )

        db.session.add(header2)

        header3 = Kanban_Header(
            name="Header 3",
            kanban_board_id=board1.id
        )

        db.session.add(header3)

        # Commit the headers
        db.session.commit()

        # Add some Kanban tickets

        ticket1 = Kanban_Ticket(
            title="Ticket 1",
            content="Content for ticket 1",
            user_id=user1.id,
            start_time=datetime.utcnow(),
            ticket_status="closed",
            kanban_board_id=board1.id,
            header_id=header1.id,
            assigned=user1.id,
            test_technologies="Python",
            test_testing_framework="pytest",
            test_function="def my_python_function(x, y): return x + y",
            test_generated_test=""
        )
        db.session.add(ticket1)

        ticket2 = Kanban_Ticket(
            title="Ticket 2",
            content="Content for ticket 2",
            user_id=user2.id,
            start_time=datetime.utcnow(),
            end_time=datetime.utcnow() + timedelta(days=1),
            header_id=header2.id,
            ticket_status="closed",
            kanban_board_id=board1.id,
            test_technologies="JavaScript",
            test_testing_framework="jest",
            test_function="function my_javascript_function(x, y) { return x + y; }",
            test_generated_test=""
        )
        db.session.add(ticket2)

        ticket3 = Kanban_Ticket(
            title="Ticket 3",
            content="Content for ticket 3",
            user_id=user1.id,
            start_time=datetime.utcnow(),
            ticket_status="in_progress",
            header_id=header2.id,
            kanban_board_id=board1.id,
            test_technologies="Python",
            test_testing_framework="pytest",
            test_function="def my_other_python_function(s): return s.upper()",
            test_generated_test=""
        )
        db.session.add(ticket3)

        ticket4 = Kanban_Ticket(
            title="Ticket 4",
            content="Content for ticket 4",
            user_id=user2.id,
            start_time=datetime.utcnow(),
            ticket_status="closed",
            kanban_board_id=board1.id,
            header_id=header2.id,
            assigned=user2.id,
            test_technologies="JavaScript",
            test_testing_framework="jest",
            test_function="function my_javascript_function(a, b, c) { return a * b * c; }",
            test_generated_test=""
        )
        db.session.add(ticket4)

        ticket5 = Kanban_Ticket(
            title="Ticket 5",
            content="Content for ticket 5",
            user_id=user1.id,
            start_time=datetime.utcnow(),
            ticket_status="closed",
            kanban_board_id=board1.id,
            header_id=header1.id,
            assigned=user1.id,
            test_technologies="Python",
            test_testing_framework="pytest",
            test_function="def my_other_python_function(s): return s.lower()",
            test_generated_test=""
        )
        db.session.add(ticket5)

        ticket6 = Kanban_Ticket(
            title="Ticket 6",
            content="Content for ticket 6",
            user_id=user1.id,
            start_time=datetime.utcnow(),
            ticket_status="closed",
            kanban_board_id=board1.id,
            header_id=header1.id,
            assigned=user1.id,
            test_technologies="Python",
            test_testing_framework="pytest",
            test_function="def my_python_function(x, y, z): return x * y + z",
            test_generated_test=""
        )
        db.session.add(ticket6)

        ticket7 = Kanban_Ticket(
            title="Ticket 7",
            content="Content for ticket 7",
            user_id=user1.id,
            start_time=datetime.utcnow(),
            ticket_status="open",
            kanban_board_id=board1.id,
            header_id=header1.id,
            assigned=user1.id,
            test_technologies="JavaScript",
            test_testing_framework="jest",
            test_function="function my_javascript_function(x, y) { return x - y; }",
            test_generated_test="Test file content here"
        )
        db.session.add(ticket7)

        ticket8 = Kanban_Ticket(
            title="Ticket 8",
            content="Content for ticket 8",
            user_id=user1.id,
            start_time=datetime.utcnow(),
            ticket_status="open",
            kanban_board_id=board1.id,
            header_id=header1.id,
            assigned=user1.id,
            test_technologies="Python",
            test_testing_framework="pytest",
            test_function="def my_python_function(x, y, z): return (x + y) * z",
            test_generated_test="Test file content here"
        )
        db.session.add(ticket8)

        ticket9 = Kanban_Ticket(
            title="Ticket 9",
            content="Content for ticket 9",
            user_id=user2.id,
            start_time=datetime.utcnow(),
            ticket_status="closed",
            kanban_board_id=board1.id,
            header_id=header3.id,
            assigned=user2.id,
            test_technologies="Python",
            test_testing_framework="pytest",
            test_function="def my_other_python_function(s): return s.strip()",
            test_generated_test="Test file content here"
        )
        db.session.add(ticket9)

        ticket10 = Kanban_Ticket(
            title="Ticket 10",
            content="Content for ticket 10",
            user_id=user2.id,
            start_time=datetime.utcnow(),
            ticket_status="open",
            kanban_board_id=board1.id,
            header_id=header3.id,
            assigned=user2.id,
            test_technologies="JavaScript",
            test_testing_framework="jest",
            test_function="function my_javascript_function(a, b) { return a / b; }",
            test_generated_test="Test file content here"
        )
        db.session.add(ticket10)

        # Commit the tickets
        db.session.commit()

        # Add some Super_User table data

        admin = Super_User(
            username="admin1",
            name="Admin 1",
            password="password1",
            members=["user1", "user2"],
            email="admin1@example.com",
            role="admin",
            isSuper=True,
        )
        db.session.add(admin)

        super_user1 = Super_User(
            username="superuser1",
            name="Super User 1",
            password="password1",
            members=["user3"],
            email="superuser1@example.com",
            role="superuser",
            isSuper=True,
        )
        db.session.add(super_user1)

        super_user2 = Super_User(
            username="superuser2",
            name="Super User 2",
            password="password1",
            members=["user4"],
            email="superuser2@example.com",
            role="superuser",
            isSuper=True,
        )
        db.session.add(super_user2)

        # Commit Super_User data
        db.session.commit()

        # Assert statements for User model
        assert User.query.count() == 3
        assert User.query.filter_by(username='user1').first().name == 'User One'
        assert User.query.filter_by(username='user2').first().name == 'User Two'
        assert User.query.filter_by(username='user3').first().name == 'User Three'

        # Assert statements for Kanban_Board model
        assert Kanban_Board.query.count() == 3
        assert db.session.query(User.name).join(Kanban_Board, User.id == Kanban_Board.user_id).filter(Kanban_Board.name == 'First Project').first()[0] == 'User One'
        assert db.session.query(User.name).join(Kanban_Board, User.id == Kanban_Board.user_id).filter(Kanban_Board.name == 'Third Project').first()[0] == 'User Two'

        # Assert statements for Kanban_Ticket model
        assert Kanban_Ticket.query.count() == 10

        # Check that the Super_User table has been populated correctly
        assert Super_User.query.count() == 3
        assert Super_User.query.filter_by(username="admin1").first().members == ["user1", "user2"]
        assert Super_User.query.filter_by(username="superuser1").first().members == ["user3"]
        assert Super_User.query.filter_by(username="superuser2").first().members == ["user4"]

        # Check that the Kanban_Header table has been populated correctly
        assert Kanban_Header.query.count() == 3
        assert Kanban_Header.query.filter_by(name="Header 1").first().kanban_board_id == 1
        assert Kanban_Header.query.filter_by(name="Header 2").first().kanban_board_id == 1
        assert Kanban_Header.query.filter_by(name="Header 3").first().kanban_board_id == 1

        # Check that the Notification table has been populated correctly
        assert Notification.query.count() == 3
        assert Notification.query.filter_by(user_name="user1").first().content == "test content"
        assert Notification.query.filter_by(user_name="user1").first().super_user_name == [["admin1"]]
        assert Notification.query.filter_by(user_name="user1").all()[1].content == "test content 2"
        assert Notification.query.filter_by(user_name="user1").all()[1].super_user_name == [["admin1"]]
        assert Notification.query.filter_by(user_name="user1").all()[2].content == "test content 3"
        assert Notification.query.filter_by(user_name="user1").all()[2].super_user_name == [["admin1"]]
        
def test_notifications():
    with app.app_context():
        notifications = Notification.query.all()
        assert len(notifications) == 3
        notification1 = Notification.query.filter_by(content="test content").first()
        assert notification1 is not None
        assert notification1.user_name == "user1"
        assert notification1.super_user_name == [["admin1"]]
        notification2 = Notification.query.filter_by(content="test content 2").first()
        assert notification2 is not None
        assert notification2.user_name == "user1"
        assert notification2.super_user_name == [["admin1"]]
        notification3 = Notification.query.filter_by(content="test content 3").first()
        assert notification3 is not None
        assert notification3.user_name == "user1"
        assert notification3.super_user_name == [["admin1"]]

def test_users():
    with app.app_context():
        users = User.query.all()
        assert len(users) == 3
        user1 = User.query.filter_by(username="user1").first()
        assert user1 is not None
        assert user1.name == "User One"
        user2 = User.query.filter_by(username="user2").first()
        assert user2 is not None
        assert user2.name == "User Two"
        user3 = User.query.filter_by(username="user3").first()
        assert user3 is not None
        assert user3.name == "User Three"

def test_kanban_headers():
    with app.app_context():
        headers = Kanban_Header.query.all()
        assert len(headers) == 3
        header1 = Kanban_Header.query.filter_by(name="Header 1").first()
        assert header1 is not None
        assert header1.kanban_board_id == 1
        header2 = Kanban_Header.query.filter_by(name="Header 2").first()
        assert header2 is not None
        assert header2.kanban_board_id == 1
        header3 = Kanban_Header.query.filter_by(name="Header 3").first()
        assert header3 is not None
        assert header3.kanban_board_id == 1

def test_kanban_board():
    with app.app_context():
        boards = Kanban_Board.query.all()
        assert len(boards) == 3
        board1 = Kanban_Board.query.filter_by(name="First Project").first()
        assert board1 is not None
        assert board1.user_id == 1
        board2 = Kanban_Board.query.filter_by(name="Second Project").first()
        assert board2 is not None
        assert board2.user_id == 1
        board3 = Kanban_Board.query.filter_by(name="Third Project").first()
        assert board3 is not None
        assert board3.user_id == 2

def test_kanban_tickets_population():
    with app.app_context():
        tickets = Kanban_Ticket.query.all()
        assert len(tickets) == 10
        ticket1 = Kanban_Ticket.query.filter_by(title="Ticket 1").first()
        assert ticket1 is not None
        assert ticket1.user_id == 1
        assert ticket1.kanban_board_id == 1
        assert ticket1.header_id == 1
        ticket2 = Kanban_Ticket.query.filter_by(title="Ticket 2").first()
        assert ticket2 is not None
        assert ticket2.user_id == 2
        assert ticket2.kanban_board_id == 1
        assert ticket2.header_id == 2
        ticket3 = Kanban_Ticket.query.filter_by(title="Ticket 3").first()
        assert ticket3 is not None
        assert ticket3.user_id == 1
        assert ticket3.kanban_board_id == 1
        assert ticket3.header_id == 2
        ticket4 = Kanban_Ticket.query.filter_by(title="Ticket 4").first()
        assert ticket4 is not None
        assert ticket4.user_id == 2
        assert ticket4.kanban_board_id == 1
        assert ticket4.header_id == 2
        ticket5 = Kanban_Ticket.query.filter_by(title="Ticket 5").first()
        assert ticket5 is not None
        assert ticket5.user_id == 1
        assert ticket5.kanban_board_id == 1
        assert ticket5.header_id == 1
        ticket6 = Kanban_Ticket.query.filter_by(title="Ticket 6").first()
        assert ticket6 is not None
        assert ticket6.user_id == 1
        assert ticket6.kanban_board_id == 1
        assert ticket6.header_id == 1
        ticket7 = Kanban_Ticket.query.filter_by(title="Ticket 7").first()
        assert ticket7 is not None
        assert ticket7.user_id == 1
        assert ticket7.kanban_board_id == 1
        assert ticket7.header_id == 1
        ticket8 = Kanban_Ticket.query.filter_by(title="Ticket 8").first()
        assert ticket8 is not None
        assert ticket8.user_id == 1
        assert ticket8.kanban_board_id == 1
        assert ticket8.header_id == 1
        ticket9 = Kanban_Ticket.query.filter_by(title="Ticket 9").first()
        assert ticket9 is not None
        assert ticket9.user_id == 2
        assert ticket9.kanban_board_id == 1
        assert ticket9.header_id == 3
        ticket10 = Kanban_Ticket.query.filter_by(title="Ticket 10").first()
        assert ticket10 is not None
        assert ticket10.user_id == 2
        assert ticket10.kanban_board_id == 1
        assert ticket10.header_id == 3

def test_super_users():
    with app.app_context():
        admin = Super_User.query.filter_by(username="admin1").first()
        assert admin is not None
        assert admin.name == "Admin 1"
        assert admin.email == "admin1@example.com"
        assert admin.role == "admin"
        assert admin.isSuper == True
        assert admin.members == ["user1", "user2"]
        super_user1 = Super_User.query.filter_by(username="superuser1").first()
        assert super_user1 is not None
        assert super_user1.name == "Super User 1"
        assert super_user1.email == "superuser1@example.com"
        assert super_user1.role == "superuser"
        assert super_user1.isSuper == True
        assert super_user1.members == ["user3"]
        super_user2 = Super_User.query.filter_by(username="superuser2").first()
        assert super_user2 is not None
        assert super_user2.name == "Super User 2"
        assert super_user2.email == "superuser2@example.com"
        assert super_user2.role == "superuser"
        assert super_user2.isSuper == True
        assert super_user2.members == ["user4"]