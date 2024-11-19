from models.enrollment import Enrollment
from models import db

def create_enrollment(data):
    enrollment = Enrollment(
        course_id=data['course_id'], 
        user_id=data['user_id']
    )
    db.session.add(enrollment)
    db.session.commit()
    return enrollment

def get_user_enrollments(user_id):
    return Enrollment.query.filter_by(user_id=user_id).all()

def get_course_enrollments(course_id):
    return Enrollment.query.filter_by(course_id=course_id).all()