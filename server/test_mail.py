import os
import unittest
from unittest.mock import patch
from mail import sendMail, mail
from models import *
from database import db
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flask_mail import Message
from app import app

def test_get_sendMail():
    assert callable(sendMail)


class TestSendMail(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    @patch.object(mail, 'send')
    def test_sendMail_closed(self, mock_send):
        result = sendMail('receiver@example.com', 'Test Ticket', 'closed', 'test_user', '','','')
        assert result == 'Sent'
        mock_send.assert_called_once()
        msg = mock_send.call_args[0][0]
        assert isinstance(msg, Message)
        assert msg.recipients == ['receiver@example.com']

    @patch.object(mail, 'send')
    def test_sendMail_blocked(self, mock_send):
        result = sendMail('receiver@example.com', 'Test Ticket', 'blocked', 'test_user', '','','')
        assert result == 'Sent'
        mock_send.assert_called_once()
        msg = mock_send.call_args[0][0]
        assert isinstance(msg, Message)
        assert msg.recipients == ['receiver@example.com']

    @patch.object(mail, 'send')
    def test_sendMail_customer(self, mock_send):
        result = sendMail('receiver@example.com', 'Test Ticket', 'customer', 'test_user', '','John Doe','Example Company')
        assert result == 'Sent'
        mock_send.assert_called_once()
        msg = mock_send.call_args[0][0]
        assert isinstance(msg, Message)
        assert msg.recipients == ['receiver@example.com']
        assert 'thank you for reaching to us' in msg.body

    @patch.object(mail, 'send')
    def test_sendMail_custom_body(self, mock_send):
        result = sendMail('receiver@example.com', 'Test Ticket', 'custom', 'test_user', 'This is a custom message','','')
        assert result == 'Sent'
        mock_send.assert_called_once()
        msg = mock_send.call_args[0][0]
        assert isinstance(msg, Message)
        assert msg.recipients == ['receiver@example.com']
        assert 'This is a custom message' in msg.body

    @patch.object(mail, 'send')
    def test_sendMail_failure(self, mock_send):
        mock_send.side_effect = Exception("Test exception")
        result = sendMail('receiver@example.com', 'Test Ticket', 'custom', 'test_user', 'This is a custom message','','')
        assert isinstance(result, Exception)
        assert str(result) == 'Test exception'

if __name__ == '__main__':
    unittest.main()