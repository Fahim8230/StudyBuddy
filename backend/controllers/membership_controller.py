from models.membership import Membership
from models import db
from datetime import datetime
def add_membership(data):
    inv = Membership(
        user_id=data['user_id'],
        study_group_id=data['study_group_id'],
        date_joined=datetime.now()
    )
    db.session.add(inv)
    db.session.commit()
    return inv

def get_memberships():
    return Membership.query.all()

def get_membership(membership_id):
    att = Membership.query.get(membership_id)
    if not att:
        raise ValueError("Membership not found")
    return att

def get_memberships_by_study_group_id(study_group_id):
    return Membership.query.filter_by(study_group_id=study_group_id).all()

def get_memberships_by_user_id(user_id):
    return Membership.query.filter_by(user_id=user_id).all()
