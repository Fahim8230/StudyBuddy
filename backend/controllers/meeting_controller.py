from models.meeting import Meeting
from models import db
from datetime import datetime
def add_meeting(data):
    received_time = datetime.strptime(data['meeting_time'], '%Y-%m-%dT%H:%M')
    inv = Meeting(
        study_group_id=data['study_group_id'],
        meeting_time=received_time,
        online_meeting=data['online_meeting'],
        meeting_location=data['meeting_location'],
        meeting_link=data['meeting_link']
    )
    db.session.add(inv)
    db.session.commit()
    return inv

def get_meetings():
    return Meeting.query.all()

def get_meeting(meeting_id):
    att = Meeting.query.get(meeting_id)
    if not att:
        raise ValueError("Meeting not found")
    return att

def get_meetings_by_study_group_id(study_group_id):
    return Meeting.query.filter_by(study_group_id=study_group_id).order_by(Meeting.meeting_time.asc()).all()

def get_meetings_by_study_group_ids(study_group_ids):
    return Meeting.query.filter(Meeting.study_group_id.in_(study_group_ids)).order_by(Meeting.meeting_time.asc()).all()
