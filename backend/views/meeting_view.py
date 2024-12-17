import datetime
from flask import request, jsonify
import controllers.meeting_controller as meeting_controller
import controllers.study_group_controller as study_group_controller
from flask import Blueprint, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
bp = Blueprint('meeting', __name__)

def meeting_to_dict(att):
    return {
        "id": att.id,
        "study_group_id": att.study_group_id,
        "meeting_time": att.meeting_time,
        "meeting_link": att.meeting_link,
        "meeting_location": att.meeting_location,
        "online_meeting": att.online_meeting,
        "study_group": att.study_group.name
    }

@bp.route('/', methods=['POST'])
@jwt_required()
def add_meeting():
    data = request.get_json()
    met = meeting_controller.add_meeting(data)
    return jsonify(meeting_to_dict(met))

@bp.route('/study-group/<int:study_group_id>', methods=['GET'])
def meetings_by_study_group(study_group_id):
    meetings = meeting_controller.get_meetings_by_study_group_id(study_group_id)
    check_time = datetime.datetime.now() - datetime.timedelta(hours=12)
    meetings = [m for m in meetings if m.meeting_time > check_time]
    objs = []
    for a in meetings:
        objs.append(meeting_to_dict(a))
    return jsonify(objs)

@bp.route('/my-meetings', methods=['GET'])
@jwt_required()
def my_meetings():
    user_id = get_jwt_identity()
    study_groups = study_group_controller.get_study_groups_by_user_id(user_id)
    study_groups_ids = [sg.id for sg in study_groups]
    meetings = meeting_controller.get_meetings_by_study_group_ids(study_groups_ids)
    check_time = datetime.datetime.now() - datetime.timedelta(hours=12)
    meetings = [m for m in meetings if m.meeting_time > check_time]
    objs = []
    for a in meetings:
        objs.append(meeting_to_dict(a))
    return jsonify(objs)


@bp.route('/<int:meeting_id>', methods=['GET'])
def meeting(meeting_id):
    meeting = meeting_controller.get_meeting(meeting_id)
    return jsonify(meeting_to_dict(meeting))

