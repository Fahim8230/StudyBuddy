from models.study_group import StudyGroup
from models import db

def add_study_group(data):
    item = StudyGroup(
        name=data['name'],
        description=data['description'],
        admin_id=data['admin_id'],
        university_id=data['university_id']
    )
    db.session.add(item)
    db.session.commit()
    return item

def get_study_groups():
    return StudyGroup.query.all()

def get_study_group(study_group_id):
    att = StudyGroup.query.get(study_group_id)
    if not att:
        raise ValueError("Study group not found")
    return att

def get_study_groups_by_university_id(university_id):
    return StudyGroup.query.filter_by(university_id=university_id).all()

def get_study_groups_of_interest(user_id):
    # return StudyGroup.query.filter(StudyGroup.memberships.none(user_id=user_id)).all()
    from controllers.membership_controller import get_memberships_by_user_id
    memberships = get_memberships_by_user_id(user_id)
    return StudyGroup.query.filter(StudyGroup.id.notin_([m.study_group_id for m in memberships])).all()

def get_study_groups_by_user_id(user_id):
    return StudyGroup.query.filter(StudyGroup.memberships.any(user_id=user_id)).all()
