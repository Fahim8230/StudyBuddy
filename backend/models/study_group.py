from . import db

class StudyGroup(db.Model):
    __tablename__ = 'study_groups'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(250), nullable=True)
    admin_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    university_id = db.Column(db.Integer, db.ForeignKey('universities.id'), nullable=False)
    admin = db.relationship('User', backref='admin', lazy=True)
    university = db.relationship('University', backref='study_groups', lazy=True)

    def __repr__(self):
        return f'<Group {self.name}>'