from flask import Flask, g
from flask_cors import CORS
from flask_session import Session
from models import db
from controllers import state_controller, university_controller
from views import user_blueprint, state_blueprint, university_blueprint, course_blueprint, enrollment_blueprint
import os
import csv
from cachelib.file import FileSystemCache

app = Flask(__name__)
app.secret_key = "3e3c8bd0805123ff87d630734e8915deb8af7dbbdba91f8d01fe3af6cc9d55d3"
CORS(app, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(os.getcwd(), "database.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = '/sessions'
app.config['SESSION_FILE_THRESHOLD'] = 500
app.config['SESSION_CACHELIB'] = FileSystemCache(threshold=500, cache_dir="/sessions")
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_SECURE'] = False

Session(app)

db.init_app(app)

app.register_blueprint(user_blueprint, url_prefix='/users')
app.register_blueprint(state_blueprint, url_prefix='/states')
app.register_blueprint(university_blueprint, url_prefix='/universities')
app.register_blueprint(course_blueprint, url_prefix='/courses')
app.register_blueprint(enrollment_blueprint, url_prefix='/enrollments')


def import_states():
    if len(state_controller.get_states()) > 0:
        return
    with open('assets/states.csv', mode='r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            state_controller.create_state(row)
            
def import_universities():
    if len(university_controller.get_universities()) > 0:
        return
    with open('assets/universities.csv', mode='r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            state = state_controller.get_state_by_abbreviation(row['state'])
            if state:
                row['state_id'] = state.id
                university_controller.create_university(row)

def setup_db():
    with app.app_context():
        db.create_all()
        import_states()
        import_universities()

if __name__ == '__main__':
    setup_db()
    app.run(debug=True)
