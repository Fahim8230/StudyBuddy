from models.attachment import Attachment
from models import db
from datetime import datetime
def save_attachment(data):
    attachment = Attachment(
        user_id=data['user_id'],
        study_group_id=data['study_group_id'],
        file_name=data['file_name'],
        file_path=data['file_path'],
        mime_type=data['mime_type'],
        date_uploaded=datetime.now()
    )
    db.session.add(attachment)
    db.session.commit()
    return attachment

def get_attachments():
    return Attachment.query.all()

def get_attachment(attachment_id):
    att = Attachment.query.get(attachment_id)
    if not att:
        raise ValueError("Attachment not found")
    return att

def get_attachments_by_study_group(study_group_id):
    return Attachment.query.filter_by(study_group_id=study_group_id).all()

def get_attachments_by_study_groups(study_group_ids):
    return Attachment.query.filter(Attachment.study_group_id.in_(study_group_ids)).all()
