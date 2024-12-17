from flask import Blueprint, request, jsonify
import controllers.study_group_controller as study_group_controller
import controllers.membership_controller as membership_controller
import controllers.message_controller as message_controller
import controllers.user_controller as user_controller
from views.course_view import course_to_dict
from views.user_view import user_to_dict
from views.message_view import message_to_dict
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
bp = Blueprint('study_group', __name__)

def study_group_to_dict(att):
    return {
        "id": att.id,
        "name": att.name,
        "description": att.description,
        "admin_id": att.admin_id,
        "admin": att.admin.name,
        "university_id": att.university_id,
        "university": att.university.name,
        "users": [user_to_dict(m.user) for m in att.memberships]
    }

@bp.route('/', methods=['POST'])
@jwt_required()
def add_study_group():
    data = request.get_json()
    data['admin_id'] = get_jwt_identity()
    user = user_controller.get_user(data['admin_id'])
    data['university_id'] = user.university_id
    result = study_group_controller.add_study_group(data)
    membership_controller.add_membership({
        "user_id": data['admin_id'],
        "study_group_id": result.id
    })
    return jsonify(study_group_to_dict(result))

@bp.route('/interest/<int:user_id>', methods=['GET'])
def get_study_groups_of_interest(user_id):
    study_groups = study_group_controller.get_study_groups_of_interest(user_id)
    objs = []
    for a in study_groups:
        objs.append(study_group_to_dict(a))
    return jsonify(objs)

@bp.route('/interest/<int:user_id>', methods=['GET'])
def get_study_groups_by_user_id(user_id):
    study_groups = study_group_controller.get_study_groups_by_user_id(user_id)
    objs = []
    for a in study_groups:
        objs.append(study_group_to_dict(a))
    return jsonify(objs)

@bp.route('/<int:study_group_id>', methods=['GET'])
def study_group(study_group_id):
    study_group = study_group_controller.get_study_group(study_group_id)
    return jsonify(study_group_to_dict(study_group))

@bp.route('/my-groups', methods=['GET'])
@jwt_required()
def get_my_groups():
    user_id = get_jwt_identity()
    study_groups = study_group_controller.get_study_groups_by_user_id(user_id)
    objs = []
    for a in study_groups:
        objs.append(study_group_to_dict(a))
    return jsonify(objs)

@bp.route('/conversations', methods=['GET'])
@jwt_required()
def get_my_groups_conversations():
    user_id = get_jwt_identity()
    study_groups = study_group_controller.get_study_groups_by_user_id(user_id)
    objs = []
    for a in study_groups:
        group = study_group_to_dict(a)
        last_message = message_controller.get_lastMessage_by_study_group_id(a.id)
        if last_message:
            group['last_message'] = message_to_dict(last_message)
            objs.append(group)
    # order objs by last_message.message_date desc
    objs.sort(key=lambda x: x['last_message']['message_date'], reverse=True)
    return jsonify(objs)

@bp.route('/of-interest', methods=['GET'])
@jwt_required()
def get_my_groups_of_interest():
    user_id = get_jwt_identity()
    study_groups = study_group_controller.get_study_groups_of_interest(user_id)
    objs = []
    for a in study_groups:
        objs.append(study_group_to_dict(a))
    return jsonify(objs)

