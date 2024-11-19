from flask import request, jsonify, session
from controllers.user_controller import create_user, get_users, login_user, get_user
from flask import Blueprint
bp = Blueprint('user', __name__)

def user_to_dict(user):
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "state_id": user.state_id,
        "state": user.state.name,
        "university_id": user.university_id,
        "university": user.university.name
    }

@bp.route('/', methods=['GET'])
def users():
    users = get_users()
    list_users = []
    for user in users:
        list_users.append(user_to_dict(user))
    return jsonify(list_users)

@bp.route('/<int:user_id>', methods=['GET'])
def user(user_id):
    user = get_user(user_id)
    return jsonify(user_to_dict(user))

@bp.route('/create-user', methods=['POST'])
def add_user():
    try:
        data = request.get_json()
        user = create_user(data)
        if user:
            session['user_id'] = user.id
        return jsonify({"message": "User created successfully", "user": user_to_dict(user), "auth": True})
    except ValueError as e:
        return jsonify({"message": str(e), "auth": False})

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if 'user_id' in session:
        return jsonify({"message": "Already logged in", "user": user_to_dict(get_user(session['user_id'])), "auth": True})
    try:
        user = login_user(data['email'], data['password'])
        if user:
            session['user_id'] = user.id
        return jsonify({"message": "Login successful", "user": user_to_dict(user), "auth": True})
    except ValueError as e:
        return jsonify({"message": str(e), "auth": False})
    
@bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logged out successfully"})

@bp.route('/auth', methods=['GET'])
def auth():
    if 'user_id' in session:
        return jsonify({"message": "User is logged in", "auth": True, "user": user_to_dict(get_user(session['user_id']))})
    return jsonify({"message": "User is not logged in", "auth": False})