from flask import request, jsonify
from controllers.state_controller import get_states, get_state
from flask import Blueprint
bp = Blueprint('state', __name__)

def state_to_dict(state):
    return {
        "id": state.id,
        "name": state.name,
        "abbreviation": state.abbreviation
    }

@bp.route('/', methods=['GET'])
def states():
    states = get_states()
    state = []
    for s in states:
        state.append(state_to_dict(s))
    return jsonify(state)

@bp.route('/<int:state_id>', methods=['GET'])
def state(state_id):
    state = get_state(state_id)
    return jsonify(state_to_dict(state))
