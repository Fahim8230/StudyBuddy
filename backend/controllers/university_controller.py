from models.university import University
from models import db

def create_university(data):
    university = University(
        name=data['name'], 
        state_id=data['state_id']
    )
    db.session.add(university)
    db.session.commit()
    return university

def get_universities():
    return University.query.order_by(University.name).all()

def get_universities_by_state(state_id):
    return University.query.filter_by(state_id=state_id).order_by(University.name).all()

def get_university(university_id):
    university = University.query.get(university_id)
    if not university:
        raise ValueError("University not found")
    return university