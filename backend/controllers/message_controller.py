from models.message import Message
from models import db
from datetime import datetime
def add_message(data):
    inv = Message(
        user_id=data['user_id'],
        study_group_id=data['study_group_id'],
        message_date=datetime.now(),
        message=data['message']
    )
    db.session.add(inv)
    db.session.commit()
    return inv

def get_messages():
    return Message.query.all()

def get_message(message_id):
    att = Message.query.get(message_id)
    if not att:
        raise ValueError("Message not found")
    return att

def get_messages_by_study_group_id(study_group_id):
    return Message.query.filter_by(study_group_id=study_group_id).order_by(Message.message_date.asc()).all()

def get_lastMessage_by_study_group_id(study_group_id):
    return Message.query.filter_by(study_group_id=study_group_id).order_by(Message.message_date.desc()).first()
