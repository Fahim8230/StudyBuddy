from models.course import Course
from models import db

def create_course(data):
    course = Course(
        name=data['name'], 
        university_id=data['university_id']
    )
    db.session.add(course)
    db.session.commit()
    return course

def get_courses():
    return Course.query.all()

def get_course(course_id):
    course = Course.query.get(course_id)
    if not course:
        raise ValueError("Course not found")
    return course

def get_courses_by_university(university_id):
    return Course.query.filter_by(university_id=university_id).all()
