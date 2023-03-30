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
        avatar="avatar1.png",
        supervisors=['admin1'],
        isSuper=False
    )
    db.session.add(gabriel)

    Sho = User(
        username="sho",
        name="Sho",
        password="password1",
        role="superuser",
        email="sho@example.com",
        avatar="avatar1.png",
        supervisors=['admin1'],
        isSuper=True
    )

    db.session.add(Sho)

    gabrielle = User(
        username="gabrielle",
        name="Gabrielle",
        password="password1",
        role="user",
        email="gabrielle@example.com",
        avatar="avatar1.png",
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
        avatar="avatar2.png",
        supervisors=['admin1'],
        isSuper=False
    )
    db.session.add(kay)

    db.session.commit()

    admin = Super_User(
        username="admin1",
        name="Admin 1",
        password="password1",
        members=["kay", "sho", "gabrile", "gabriel"],
        email="admin1@example.com",
        role="admin",
        isSuper=True,
    )
    db.session.add(admin)

    db.session.commit()

    # Create Boards

    kanbanai = Kanban_Board(
        user_id=gabriel.id, name='KanbanAI', start_time=datetime.utcnow(), board_users=[1, 2, 3, 4])
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
        test_technologies="",
        test_testing_framework="",
        test_function="",
        test_generated_test="",
    )

    db.session.add(new_ticket)

    db.session.commit()
