from flask_sqlalchemy import SQLAlchemy
from database import db

def test_db_instance():
    assert isinstance(db, SQLAlchemy)
