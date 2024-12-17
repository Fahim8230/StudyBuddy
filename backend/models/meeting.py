from . import db

class Meeting(db.Model):
    __tablename__ = 'meetings'
    id = db.Column(db.Integer, primary_key=True)
    study_group_id = db.Column(db.Integer, db.ForeignKey('study_groups.id'), nullable=False)
    study_group = db.relationship('StudyGroup', backref='meetings', lazy=True)
    meeting_time = db.Column(db.DateTime, nullable=False)
    online_meeting = db.Column(db.Boolean, default=False)
    meeting_location = db.Column(db.String(250), nullable=False)
    meeting_link = db.Column(db.String(250), nullable=True)
    
    def __repr__(self):
        return f'<Meeting for {self.study_group} with id {self.id}>'