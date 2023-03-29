# Create Boards

kanbanai = Kanban_Board(
    user_id=user1.id, name='KanbanAI', start_time=datetime.utcnow(), board_users=[1, 2, 3, 4])
db.session.add(kanbanai)

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
