from models.user import User
from models import db
from bcrypt import hashpw, gensalt, checkpw

def encrypt_password(plain_password):
    salt = gensalt()
    hashed_password = hashpw(plain_password.encode('utf-8'), salt)
    return hashed_password, salt

def verify_password(input_password, user):
    stored_salt = user.salt.encode('utf-8')
    hashed_input = hashpw(input_password.encode('utf-8'), stored_salt)
    return hashed_input == user.password.encode('utf-8')

def create_user(data):
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        raise ValueError("This email is already registered")
    hashed_password, salt = encrypt_password(data['password'])
    user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_password.decode('utf-8'),
        salt=salt.decode('utf-8'),
        state_id=data['state_id'],
        university_id=data.get('university_id')
    )
    db.session.add(user)
    db.session.commit()
    return user

def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        raise ValueError("User not found")
    return user

def get_user_by_email(email):
    user = User.query.filter_by(email=email).first()
    if not user:
        raise ValueError("User not found")
    return user

def get_users():
    return User.query.all()

def login_user(email, password):
    user = get_user_by_email(email)
    if not user:
        raise ValueError("User not found")
    if not verify_password(password, user):
        raise ValueError("Invalid password")
    return user

