from database import db


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    avatar = db.Column(db.String(255), nullable=True)

    def __init__(self, username, name, password, role, email, avatar=None):
        self.username = username
        self.name = name
        self.password = password
        self.role = role
        self.email = email
        self.avatar = avatar

    def check_password(self, password):
        return self.password == password


class Kanban_Board(db.Model):
    __tablename__ = 'kanban_board'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=True)


class Kanban_Ticket(db.Model):
    __tablename__ = 'kanban_ticket'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=True)
    ticket_status = db.Column(db.String(80), nullable=False)
    kanban_board_id = db.Column(db.Integer, db.ForeignKey(
        'kanban_board.id'), nullable=False)
