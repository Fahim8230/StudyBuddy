from . import db

class Attachment(db.Model):
    __tablename__ = 'attachments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    study_group_id = db.Column(db.Integer, db.ForeignKey('study_groups.id'), nullable=False)
    user = db.relationship('User', backref='attachments', lazy=True)
    study_group = db.relationship('StudyGroup', backref='attachments', lazy=True)
    file_name = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(255), nullable=False)
    mime_type = db.Column(db.String(255), nullable=False)
    date_uploaded = db.Column(db.DateTime, nullable=False)
    
    def __repr__(self):
        return f'<Attachment {self.id}>'