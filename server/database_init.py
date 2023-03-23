from app import app
from database import db
from models import User, Kanban_Board, Kanban_Ticket, Kanban_Header
from datetime import datetime, timedelta

with app.app_context():

    # Drop all tables if they already exist
    db.drop_all()
    # Create the tables
    db.create_all()

    # Add some users
    user1 = User(
        username="user1",
        name="User One",
        password="password1",
        role="leader",
        email="user1@example.com",
        avatar="avatar1.png",
    )
    db.session.add(user1)

    user2 = User(
        username="user2",
        name="User Two",
        password="password2",
        role="user",
        email="user2@example.com",
        avatar="avatar2.png",
    )
    db.session.add(user2)

    # Commit the users
    db.session.commit()

    # Add some Kanban boards
    board1 = Kanban_Board(user_id=user1.id, start_time=datetime.utcnow())
    db.session.add(board1)

    board2 = Kanban_Board(
        user_id=user1.id,
        start_time=datetime.utcnow() - timedelta(days=5),
        end_time=datetime.utcnow() - timedelta(days=1),
    )
    db.session.add(board2)

    board3 = Kanban_Board(user_id=user2.id, start_time=datetime.utcnow())
    db.session.add(board3)

    db.session.commit()

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

    # Commit the boards
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
        assigned=user1.id
    )
    db.session.add(ticket1)

    ticket2 = Kanban_Ticket(
        title="Ticket 2",
        content="Content for ticket 2",
        user_id=user2.id,
        start_time=datetime.utcnow(),
        end_time=datetime.utcnow() + timedelta(days=1),
        ticket_status="closed",
        kanban_board_id=board3.id,
    )
    db.session.add(ticket2)

    ticket3 = Kanban_Ticket(
        title="Ticket 3",
        content="Content for ticket 3",
        user_id=user1.id,
        start_time=datetime.utcnow(),
        ticket_status="in_progress",
        kanban_board_id=board1.id,
    )
    db.session.add(ticket3)

    ticket4 = Kanban_Ticket(
        title="Ticket 4",
        content="Content for ticket 4",
        user_id=user2.id,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=board3.id,
    )
    db.session.add(ticket4)

    ticket5 = Kanban_Ticket(
        title="Ticket 5",
        content="Content for ticket 5",
        user_id=user1.id,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=board1.id,
        header_id=header2.id,
        assigned=user1.id
    )
    db.session.add(ticket5)

    ticket6 = Kanban_Ticket(
        title="Ticket 6",
        content="Content for ticket 6",
        user_id=user1.id,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=board1.id,
        header_id=header2.id,
        assigned=user1.id
    )
    db.session.add(ticket6)

    ticket7 = Kanban_Ticket(
        title="Ticket 7",
        content="Content for ticket 7",
        user_id=user1.id,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=board1.id,
        header_id=header3.id,
        assigned=user1.id
    )
    db.session.add(ticket7)

    ticket8 = Kanban_Ticket(
        title="Ticket 8",
        content="Content for ticket 8",
        user_id=user1.id,
        start_time=datetime.utcnow(),
        ticket_status="open",
        kanban_board_id=board1.id,
        header_id=header3.id,
        assigned=user1.id
    )
    db.session.add(ticket8)

    # Commit the tickets
    db.session.commit()
