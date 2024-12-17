from flask import request, jsonify
from controllers.membership_controller import add_membership, get_memberships_by_user_id, get_memberships_by_study_group_id
from views.study_group_view import study_group_to_dict
from views.user_view import user_to_dict
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import Blueprint
bp = Blueprint('membership', __name__)

@bp.route('/user/<int:user_id>', methods=['GET'])
def user_memberships(user_id):
    memberships = get_memberships_by_user_id(user_id)
    list_memberships = []
    for enrol in list_memberships:
        list_memberships.append(study_group_to_dict(enrol))
    return jsonify(memberships)

@bp.route('/study-group/<int:study_group_id>', methods=['GET'])
def study_group_memberships(study_group_id):
    memberships = get_memberships_by_study_group_id(study_group_id)
    list_memberships = []
    for enrol in list_memberships:
        list_memberships.append(user_to_dict(enrol))
    return jsonify(memberships)

@bp.route('/join-group/<int:study_group_id>', methods=['POST'])
@jwt_required()
def join_group(study_group_id):
    user_id = get_jwt_identity()
    result = add_membership({
        "user_id": int(user_id),
        "study_group_id": study_group_id
    })
    return jsonify({"id": result.id})