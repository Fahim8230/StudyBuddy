from flask import request, jsonify
from controllers.course_controller import get_courses, get_course, create_course, get_courses_by_university
from flask import Blueprint
bp = Blueprint('course', __name__)

def course_to_dict(course):
    return {
        "id": course.id,
        "name": course.name,
        "university_id": course.university_id,
        "university": course.university.name
    }

@bp.route('/', methods=['GET'])
def courses():
    courses = get_courses()
    list_courses = []
    for c in courses:
        list_courses.append(course_to_dict(c))
    return jsonify(list_courses)

@bp.route('/<int:course_id>', methods=['GET'])
def course(course_id):
    course = get_course(course_id)
    return jsonify(course_to_dict(course))

@bp.route('/', methods=['POST'])
def add_course():
    data = request.get_json()
    course = create_course(data)
    return jsonify(course_to_dict(course))

@bp.route('/university/<int:university_id>', methods=['GET'])
def courses_by_university(university_id):
    courses = get_courses_by_university(university_id)
    list_courses = []
    for c in courses:
        list_courses.append(course_to_dict(c))
    return jsonify(list_courses)



