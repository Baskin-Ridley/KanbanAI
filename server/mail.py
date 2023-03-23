from dotenv import load_dotenv
import os
from flask_mail import Mail,Message
from flask import Flask, jsonify
from database import db

load_dotenv()
DATABASE_URL = os.environ.get('DATABASE_URL')
FLASK_RUN_PORT = int(os.environ.get('FLASK_RUN_PORT', 5000))
PASSWORD = os.environ.get('PASSWORD')
app = Flask(__name__)
mail = Mail(app)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465 or 587
app.config['MAIL_USERNAME'] = 'app.builtdifferent@gmail.com'
app.config['MAIL_PASSWORD'] = "zykasaqvxuyazjui"
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

db.init_app(app)



def sendMail(admin,title,member):
   msg = Message('Hello',sender ='shorizon1234@gmail.com',recipients = [admin])
   msg.body = f'Hello the task "{title}" has been successfully closed by "{member}"'    

   try: 
    mail.send(msg)
    return 'Sent'
   except Exception as e:
    return e



if __name__ == '__main__':
    app.run()
