from dotenv import load_dotenv
import os
from flask_mail import Mail, Message
from flask import Flask
from database import db


load_dotenv()

PASSWORD = os.environ.get('PASS')
app = Flask(__name__)
mail = Mail(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465 or 587
app.config['MAIL_USERNAME'] = 'app.builtdifferent.info@gmail.com'
app.config['MAIL_PASSWORD'] = PASSWORD
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)



def sendMail(receiver, title, state, user_name,body,person,company):
    msg = Message('', sender='shorizon1234@gmail.com', recipients=[receiver])
    if(state == "closed"):
        msg.body = f'Hi Supervisor, \nthe ticket "{title}" has been succefully closed by user: {user_name}'
    if(state == "blocked"):
        msg.body = f'Hi Scram Master, \nthe ticket "{title}" has been flagged as blocked by user: {user_name}'
    if(state == "customer"):
        msg.body = f'Hi, {person} from {company} thank you for reaching to us, we will be emailing you shortly'
    else:
        msg.body = body
    try:
        mail.send(msg)
        print('SENT!')
        return 'Sent'
    except Exception as e:
        return e


if __name__ == '__main__':
    app.run()
