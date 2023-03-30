from controllers import *
from models import *
import unittest
from unittest.mock import patch, MagicMock
import json
from database import db
import tempfile
import os
import pytest
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from app import app
from mail import *
from dotenv import load_dotenv

# Notification controller tests


def test_get_Notifications():
    assert callable(get_Notifications)


def test_get_Notifications_data_attribute():
    DATABASE_URL = os.environ.get('DATABASE_URL')
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    with app.app_context():
        db.init_app(app)
        notification = Notification(
            content='Test Notification', user_name='user1', super_user_name=['super_user1'])
        db.session.add(notification)
        db.session.commit()
        notification_from_db = Notification.query.filter_by(
            id=notification.id).first()
        assert notification_from_db.content == 'Test Notification'
        assert notification_from_db.user_name == 'user1'
        assert notification_from_db.super_user_name == ['super_user1']


class TestGetNotifications(unittest.TestCase):
    def setUp(self):
        self.notifications_data = [
            Notification(super_user_name='test_super_user',
                         user_name='user1', content='Notification 1'),
            Notification(super_user_name='test_super_user',
                         user_name='user2', content='Notification 2'),
            Notification(super_user_name='test_super_user',
                         user_name='user3', content='Notification 3')
        ]

    def test_get_Notifications_empty(self):
        query_mock = MagicMock()
        query_mock.filter_by.return_value = []
        Notification.query = query_mock
        notifications, status = get_Notifications('test_super_user')
        self.assertEqual(status, 200)
        self.assertEqual(len(notifications), 0)

    def test_get_Notifications_non_empty(self):
        query_mock = MagicMock()
        query_mock.filter_by.return_value = self.notifications_data
        Notification.query = query_mock
        notifications, status = get_Notifications('test_super_user')
        self.assertEqual(status, 200)
        self.assertEqual(len(notifications), 3)
        for i, notification in enumerate(notifications):
            self.assertEqual(notification['content'], f'Notification {i + 1}')
            self.assertEqual(notification['member'], f'user{i + 1}')
        self.assertEqual(notifications[0]['content'], 'Notification 1')
        self.assertEqual(notifications[0]['member'], 'user1')
        self.assertEqual(notifications[1]['content'], 'Notification 2')
        self.assertEqual(notifications[1]['member'], 'user2')
        self.assertEqual(notifications[2]['content'], 'Notification 3')
        self.assertEqual(notifications[2]['member'], 'user3')

# Super User Controller

def test_register_Super_User():
    assert callable(register_Super_User)

def test_register_user():
    assert callable(register_user)


def test_add_member():
    assert callable(add_member)


def test_get_members():
    assert callable(get_members)


def test_login():
    assert callable(login)


def test_get_users():
    assert callable(get_users)


def test_get_user():
    assert callable(get_user)


def test_find_user_by_username():
    assert callable(find_user_by_username)


def test_update_user():
    assert callable(update_user)


def test_delete_user():
    assert callable(delete_user)

# Kanban_Board controller tests


def test_get_kanban_boards_with_super():
    assert callable(get_kanban_boards_with_super)


def test_create_kanban_board():
    assert callable(create_kanban_board)


def test_get_kanban_boards():
    assert callable(get_kanban_boards)


def test_get_kanban_board():
    assert callable(get_kanban_board)


def test_update_kanban_board():
    assert callable(update_kanban_board)


def test_delete_kanban_board():
    assert callable(delete_kanban_board)

# Kanban Ticket controller tests


def test_create_kanban_ticket():
    assert callable(create_kanban_ticket)


def test_get_kanban_tickets():
    assert callable(get_kanban_tickets)


def test_get_kanban_tickets_by_board():
    assert callable(get_kanban_tickets_by_board)


def test_get_kanban_ticket():
    assert callable(get_kanban_ticket)


def test_update_kanban_ticket():
    assert callable(update_kanban_ticket)


def test_delete_kanban_ticket():
    assert callable(delete_kanban_ticket)

# Kanban Header Controller tests


def test_create_kanban_header():
    assert callable(create_kanban_header)


def test_get_kanban_headers_by_board():
    assert callable(get_kanban_headers_by_board)


def test_update_kanban_headers_by_board():
    assert callable(update_kanban_headers_by_board)


def test_delete_kanban_header_by_board():
    assert callable(delete_kanban_header_by_board)

# Positions Controller tests


def test_get_positions_by_board():
    assert callable(get_positions_by_board)


def test_update_positions_by_board():
    assert callable(update_positions_by_board)

# Checker Controller tests


def test_check_user_name():
    assert callable(check_user_name)


def test_log_changes():
    assert callable(log_changes)


def test_email_from_form():
    assert callable(email_from_form)


class TestEmailFromForm(unittest.TestCase):
    def test_email_from_form_request_data(self):
        with app.test_request_context('/email-from-form', json={
            'body': 'This is a test email',
            'email': 'test@example.com',
            'person': 'John Doe',
            'company': 'ABC Corp'
        }):
            data = request.get_json()
            self.assertEqual(data.get('body'), 'This is a test email')
            self.assertEqual(data.get('email'), 'test@example.com')
            self.assertEqual(data.get('person'), 'John Doe')
            self.assertEqual(data.get('company'), 'ABC Corp')


if __name__ == '__main__':
    unittest.main()
