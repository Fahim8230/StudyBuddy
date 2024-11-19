from models.state import State
from models import db

def create_state(data):
    state = State(
        name=data['name'], 
        abbreviation=data['abbreviation']
    )
    db.session.add(state)
    db.session.commit()
    return state

def get_states():
    return State.query.order_by(State.name).all()

def get_state(state_id):
    state = State.query.get(state_id)
    if not state:
        raise ValueError("State not found")
    return state

def get_state_by_abbreviation(str):
    state = State.query.filter_by(abbreviation=str).first()
    if not state:
        raise ValueError("State not found")
    return state