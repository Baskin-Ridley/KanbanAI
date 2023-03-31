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

    gabriel = User(
        username="gabriel",
        name="Gabriel",
        password="password1",
        role="user",
        email="gabriel@example.com",
        avatar="https://ca.slack-edge.com/THYP60S66-U04HNB0QR8R-ccb8ac6eb01a-512",
        supervisors=['admin1'],
        isSuper=False
    )
    db.session.add(gabriel)

    Sho = User(
        username="sho",
        name="Sho",
        password="password1",
        role="user",
        email="sho@example.com",
        avatar="https://ca.slack-edge.com/THYP60S66-U04APTQU7DW-406bbf06d915-512",
        supervisors=['admin1'],
        isSuper=False
    )

    db.session.add(Sho)

    gabrielle = User(
        username="gabrielle",
        name="Gabrielle",
        password="password1",
        role="user",
        email="gabrielle@example.com",
        avatar="https://ca.slack-edge.com/THYP60S66-U049W6N03LM-8450b330ee4d-512",
        supervisors=['admin1'],
        isSuper=False
    )
    db.session.add(gabrielle)

    kay = User(
        username="kay",
        name="Kay",
        password="password1",
        role="user",
        email="kay@example.com",
        avatar="https://ca.slack-edge.com/THYP60S66-U04E8AUGYJ1-2b89ac7767a5-512",
        supervisors=['admin1'],
        isSuper=False
    )
    db.session.add(kay)

    db.session.commit()

    admin = Super_User(
        username="admin1",
        name="Admin 1",
        password="password1",
        members=["kay", "sho", "gabrielle", "gabriel"],
        email="admin1@example.com",
        role="admin",
        isSuper=True,
    )
    db.session.add(admin)

    db.session.commit()

    # Create Boards

    kanbanai = Kanban_Board(
        user_id=kay.id, name='KanbanAI', start_time=datetime.utcnow(), board_users=[1, 2, 3, 4])
    db.session.add(kanbanai)

    # Commmit the boards
    db.session.commit()

    # Add KanbanAI headers

    epic = Kanban_Header(
        name="Epic",
        kanban_board_id=kanbanai.id
    )

    db.session.add(epic)

    todo = Kanban_Header(
        name="To Do",
        kanban_board_id=kanbanai.id
    )

    db.session.add(todo)

    doing = Kanban_Header(
        name="Doing",
        kanban_board_id=kanbanai.id
    )

    db.session.add(doing)

    testing = Kanban_Header(
        name="Testing",
        kanban_board_id=kanbanai.id
    )

    db.session.add(testing)

    done = Kanban_Header(
        name="Done",
        kanban_board_id=kanbanai.id
    )

    db.session.add(done)

    db.session.commit()

    # Add tickets

    new_ticket = Kanban_Ticket(
        title="Allow simultaneous use of board",
        content="Users should be able to use the board simultaneously",
        user_id=1,  # replace with the user ID of the person assigned to this ticket
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,  # replace with the ID of the Kanban board to which this ticket belongs
        # replace with the header under which this ticket is placed (e.g., ToDo, Doing, etc.)
        header_id=doing.id,
        assigned=1,  # replace with the user ID of the person assigned to work on this ticket
        test_technologies="JavaScript",
        test_testing_framework="jest",
        test_function="function my_javascript_function(x, y) { return x + y; }",
        test_generated_test="",
    )

    db.session.add(new_ticket)

    # Create a new ticket object with the provided content
    notification_ticket = Kanban_Ticket(
        title="Notification System for Closed Tickets",
        content="Backend - admin users should be able to receive notifications when a ticket has been closed",
        user_id=3,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,
        header_id=todo.id,
        assigned=None,
        test_technologies="test",
        test_testing_framework="test",
        test_function="test",
        test_generated_test=""
    )

# Add the new ticket to the database session
    db.session.add(notification_ticket)

    # Create a new ticket object with the provided content
    new_ticket2 = Kanban_Ticket(
        title="Create Kanban Tasks",
        content="Users should be able to create Kanban tasks",
        user_id=2,  # Replace with the ID of the user who created the ticket
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,  # Replace with the ID of the Kanban board to which this ticket belongs
        header_id=todo.id,  # Replace with the ID of the header under which this ticket is placed
        assigned=None,
        test_technologies="test",
        test_testing_framework="test",
        test_function="test",
        test_generated_test=""
    )

    # Add the new ticket to the database session
    db.session.add(new_ticket2)

    new_ticket3 = Kanban_Ticket(
        title="Create Kanban Tasks",
        content="users should be able to be assigned to the board",
        user_id=2,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,
        header_id=doing.id,
                assigned=None,
        test_technologies="test",
        test_testing_framework="test",
        test_function="test",
        test_generated_test=""
    )
    db.session.add(new_ticket3)

    new_ticket4 = Kanban_Ticket(
        title="Go to kanban board",
        content="users should be able to see the Main Kanban Board page",
        user_id=2,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,
        header_id=done.id,
        assigned=None,
        test_technologies="test",
        test_testing_framework="test",
        test_function="test",
        test_generated_test=""
    )
    db.session.add(new_ticket4)

    new_ticket5 = Kanban_Ticket(
        title="delete ticket",
        content="users should be able to delete a ticket",
        user_id=2,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,
        header_id=testing.id,
        assigned=None,
        test_technologies="test",
        test_testing_framework="test",
        test_function="test",
        test_generated_test=""
    )
    db.session.add(new_ticket5)

    new_ticket6 = Kanban_Ticket(
        title="edit ticket",
        content="users should be able to edit a ticket",
        user_id=2,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,
        header_id=testing.id,
        assigned=None,
        test_technologies="test",
        test_testing_framework="test",
        test_function="test",
        test_generated_test=""
    )
    db.session.add(new_ticket6)

    new_ticket7 = Kanban_Ticket(
        title="ai steps",
        content="users should be able to use ai to break down the steps on the project board",
        user_id=2,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,
        header_id=done.id,
        assigned=None,
        test_technologies="test",
        test_testing_framework="test",
        test_function="test",
        test_generated_test=""
    )
    db.session.add(new_ticket7)

    new_ticket7 = Kanban_Ticket(
        title="logout",
        content="users should be able to log out",
        user_id=2,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,
        header_id=epic.id,
        assigned=None,
        test_technologies="test",
        test_testing_framework="test",
        test_function="test",
        test_generated_test=""
    )
    db.session.add(new_ticket7)

    new_ticket8 = Kanban_Ticket(
        title="register",
        content="users should be able to register",
        user_id=2,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,
        header_id=done.id,
        assigned=None,
        test_technologies="test",
        test_testing_framework="test",
        test_function="test",
        test_generated_test=""
    )
    db.session.add(new_ticket8)

    new_ticket9 = Kanban_Ticket(
        title="nabar",
        content="users should be able to see navbar conditional upon login",
        user_id=2,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,
        header_id=doing.id,
        assigned=None,
        test_technologies="test",
        test_testing_framework="test",
        test_function="test",
        test_generated_test=""
    )
    db.session.add(new_ticket9)

    new_ticket11 = Kanban_Ticket(
        title="Kanban Headers",
        content="users should be able to create kanban headers",
        user_id=2,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,
        header_id=epic.id,
        assigned=None,
        test_technologies="test",
        test_testing_framework="test",
        test_function="test",
        test_generated_test=""
    )
    db.session.add(new_ticket11)

    new_ticket12 = Kanban_Ticket(
        title="Scrum Notifications",
        content="Scrum Master should be able to receive automatic notifications",
        user_id=2,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,
        header_id=epic.id,
        assigned=None,
        test_technologies="test",
        test_testing_framework="test",
        test_function="test",
        test_generated_test=""
    )
    db.session.add(new_ticket12)

    new_ticket13 = Kanban_Ticket(
        title="Admin Notifications",
        content="admins should be able to receive notifications when a ticket has been closed",
        user_id=2,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,
        header_id=epic.id,
        assigned=None,
        test_technologies="test",
        test_testing_framework="test",
        test_function="test",
        test_generated_test=""
    )
    db.session.add(new_ticket13)

    new_ticket14 = Kanban_Ticket(
        title="StackOverFlow integration",
        content="users should be able to access the stackoverflow menu",
        user_id=2,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,
        header_id=testing.id,
        assigned=None,
        test_technologies="test",
        test_testing_framework="test",
        test_function="test",
        test_generated_test=""
    )
    db.session.add(new_ticket14)

    new_ticket15 = Kanban_Ticket(
        title="github integration",
        content="users should be able to access the github menu",
        user_id=2,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,
        header_id=testing.id,
        assigned=None,
        test_technologies="test",
        test_testing_framework="test",
        test_function="test",
        test_generated_test=""
    )
    db.session.add(new_ticket15)

    new_ticket16 = Kanban_Ticket(
        title="github/stackoverflow integration",
        content="users should be able to access github/overstack within the same page",
        user_id=2,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=1,
        header_id=epic.id,
        assigned=None,
        test_technologies="test",
        test_testing_framework="test",
        test_function="test",
        test_generated_test=""
    )
    db.session.add(new_ticket16)

    db.session.commit()
