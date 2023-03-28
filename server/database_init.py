from app import app
from database import db
from models import User, Kanban_Board, Kanban_Ticket, Kanban_Header, Super_User, Notification
from datetime import datetime, timedelta

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
        user_id=user1.id, start_time=datetime.utcnow(), board_users=[1, 2, 3, 4])

    db.session.add(board1)

    board2 = Kanban_Board(
        user_id=user1.id,
        start_time=datetime.utcnow() - timedelta(days=5),
        end_time=datetime.utcnow() - timedelta(days=1),
        board_users=[1, 2, 3, 4]
    )
    db.session.add(board2)

    board3 = Kanban_Board(user_id=user2.id, start_time=datetime.utcnow())
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
        ticket_status="open",
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
        ticket_status="open",
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
        ticket_status="open",
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
        ticket_status="open",
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
        ticket_status="open",
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
