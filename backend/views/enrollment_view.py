from flask import request, jsonify
from controllers.enrollment_controller import get_user_enrollments, get_course_enrollments
from views.course_view import course_to_dict
from views.user_view import user_to_dict
from flask import Blueprint
bp = Blueprint('enrollment', __name__)

@bp.route('/user/<int:user_id>', methods=['GET'])
def user_enrollments(user_id):
    enrollments = get_user_enrollments(user_id)
    list_enrollments = []
    for enrol in list_enrollments:
        list_enrollments.append(course_to_dict(enrol))
    return jsonify(enrollments)

@bp.route('/course/<int:course_id>', methods=['GET'])
def course_enrollments(course_id):
    enrollments = get_course_enrollments(course_id)
    list_enrollments = []
    for enrol in list_enrollments:
        list_enrollments.append(user_to_dict(enrol))
    return jsonify(enrollments)
