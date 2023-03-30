# Steps to setup server

1. Install dependencies:
   `cd server && pip install flask Flask-SQLAlchemy psycopg2-binary python-dotenv`

2. Create a `.env` file with the content:

```
DATABASE_URL=link_from_slack_dashboard
FLASK_RUN_PORT=3001
```

3. To run the server on port 3001 run:

```
python app.py
```

Then, enter the client directory and type `npm run dev` to also start the client server and see the app in browser.

4. Initialise the database and add sample data:

```
python database_init.py
```
5. To install pytest I had to use this command
```
pip install --upgrade --force-reinstall pytest
```
To run a test, use this command in server folder:
```
python -m pytest test_database_init.py
```
6. To get the coverage 
```
pip install --upgrade --force-reinstall coverage
```
To run the coverage
```
coverage run -m pytest test_database_init.py test_controllers.py test_app.py test_database.py test_models.py test_mail.py
```
and to see the coverage report
```
coverage report -m
```