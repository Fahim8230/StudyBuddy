from flask import request, jsonify, session
from controllers.user_controller import create_user, get_users, login_user, get_user, verify_password, encrypt_password, update_password
from flask import Blueprint
from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required
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
        token = create_access_token(identity=str(user.id))
        print("Token", token)
        return jsonify({"message": "User created successfully", "user": user_to_dict(user), "auth": True, "token": token})
    except ValueError as e:
        return jsonify({"message": str(e), "auth": False})

@bp.route('/login', methods=['POST'])
@jwt_required(optional=True)
def login():
    data = request.get_json()
    current_id = get_jwt_identity()
    if current_id:
        return jsonify({"message": "Already logged in", "user": user_to_dict(get_user(current_id)), "auth": True})
    try:
        user = login_user(data['email'], data['password'])
        token = create_access_token(identity=str(user.id))
        return jsonify({"message": "Login successful", "user": user_to_dict(user), "auth": True, "token": token})
    except ValueError as e:
        return jsonify({"message": str(e), "auth": False})
    
@bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logged out successfully"})

@bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    current_id = get_jwt_identity()
    data = request.get_json()
    if not current_id or not data['current_password'] or not data['new_password']:
        return False, 400
    try:
        user = get_user(current_id)
        if not verify_password(data['current_password'], user):
            return jsonify({"message": "Invalid password"}), 400
        update_password(data['new_password'], user)
        return jsonify({"message": "Password changed successfully"})
    except Exception as e:
        return jsonify({"message": str(e)}), 400

@bp.route('/auth', methods=['GET'])
@jwt_required(optional=True)
def auth():
    current_id = get_jwt_identity()
    if current_id:
        return jsonify({"message": "User is logged in", "auth": True, "user": user_to_dict(get_user(current_id))})
    return jsonify({"message": "User is not logged in", "auth": False})