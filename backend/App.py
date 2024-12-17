from datetime import timedelta
from flask import Flask, g
from flask_cors import CORS
from flask_session import Session
from models import db
from controllers import state_controller, university_controller
import views as views
import os
import csv
from cachelib.file import FileSystemCache
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.secret_key = "3e3c8bd0805123ff87d630734e8915deb8af7dbbdba91f8d01fe3af6cc9d55d3"
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = "3e3c8bd0805123ff87d630734e8915deb8af7dbbdba91f8d01fe3af6cc9d55d3"
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(os.getcwd(), "database.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SESSION_TYPE'] = 'filesystem'
# app.config['SESSION_FILE_DIR'] = os.path.join(os.getcwd(), "sessions")
# app.config['SESSION_FILE_THRESHOLD'] = 500
# app.config['SESSION_CACHELIB'] = FileSystemCache(threshold=500, cache_dir=os.path.join(os.getcwd(), "sessions"))
# app.config['SESSION_COOKIE_SAMESITE'] = 'None'
# app.config['SESSION_COOKIE_SECURE'] = False
# Session(app)
app.config['JWT_SECRET_KEY'] = '795c95f7d7cc7c3f1204671206c4eb8a2cdf926ff1e54f13ab8ea1dff7437e7a'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_ALGORITHM'] = 'HS256'
jwt = JWTManager(app)

db.init_app(app)

app.register_blueprint(views.user_blueprint, url_prefix='/users')
app.register_blueprint(views.state_blueprint, url_prefix='/states')
app.register_blueprint(views.university_blueprint, url_prefix='/universities')
app.register_blueprint(views.course_blueprint, url_prefix='/courses')
app.register_blueprint(views.enrollment_blueprint, url_prefix='/enrollments')
app.register_blueprint(views.study_group_blueprint, url_prefix='/study-groups')
app.register_blueprint(views.message_blueprint, url_prefix='/messages')
app.register_blueprint(views.meeting_blueprint, url_prefix='/meeting')
app.register_blueprint(views.membership_blueprint, url_prefix='/memberships')
app.register_blueprint(views.attachment_blueprint, url_prefix='/attachment')

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
