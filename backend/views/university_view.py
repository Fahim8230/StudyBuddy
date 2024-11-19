from flask import request, jsonify
from controllers.university_controller import get_universities, get_university, get_universities_by_state
from flask import Blueprint
bp = Blueprint('university', __name__)

def uni_to_dict(uni):
    return {
        "id": uni.id,
        "name": uni.name,
        "state_id": uni.state_id,
        "state": uni.state.name
    }

@bp.route('/', methods=['GET'])
def universities():
    universities = get_universities()
    unis = []
    for uni in universities:
        unis.append(uni_to_dict(uni))
    return jsonify(unis)

@bp.route('/state/<int:state_id>', methods=['GET'])
def universities_by_state(state_id):
    universities = get_universities_by_state(state_id)
    unis = []
    for uni in universities:
        unis.append(uni_to_dict(uni))
    return jsonify(unis)

@bp.route('/<int:university_id>', methods=['GET'])
def university(university_id):
    uni = get_university(university_id)
    return jsonify(uni_to_dict(uni))



