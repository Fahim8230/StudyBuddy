from . import db

class Membership(db.Model):
    __tablename__ = 'memberships'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    study_group_id = db.Column(db.Integer, db.ForeignKey('study_groups.id'), nullable=False)
    user = db.relationship('User', backref='memberships', lazy=True)
    study_group = db.relationship('StudyGroup', backref='memberships', lazy=True)
    date_joined = db.Column(db.DateTime, nullable=False)
    
    def __repr__(self):
        return f'<Membership {self.id} {self.user_id} {self.study_group_id}>'