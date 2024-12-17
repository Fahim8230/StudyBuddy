from flask import request, jsonify, Blueprint
import controllers.message_controller as message_controller
import os
from flask_jwt_extended import jwt_required, get_jwt_identity
bp = Blueprint('message', __name__)

def message_to_dict(att):
    return {
        "id": att.id,
        "user_id": att.user_id,
        "study_group_id": att.study_group_id,
        "message": att.message,
        "message_date": att.message_date,
        "user": att.user.name,
        "study_group": att.study_group.name
    }

@bp.route('/', methods=['POST'])
@jwt_required()
def add_message():
    data = request.get_json()
    data['user_id'] = get_jwt_identity()
    result = message_controller.add_message(data)
    return jsonify(message_to_dict(result))

@bp.route('/study-group/<int:study_group_id>', methods=['GET'])
def messages_by_study_group_id(study_group_id):
    messages = message_controller.get_messages_by_study_group_id(study_group_id)
    objs = []
    for a in messages:
        objs.append(message_to_dict(a))
    return jsonify(objs)

@bp.route('/<int:message_id>', methods=['GET'])
def message(message_id):
    message = message_controller.get_message(message_id)
    return jsonify(message_to_dict(message))

