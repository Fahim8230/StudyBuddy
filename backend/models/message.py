from . import db

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    study_group_id = db.Column(db.Integer, db.ForeignKey('study_groups.id'), nullable=False)
    user = db.relationship('User', backref='messages', lazy=True)
    study_group = db.relationship('StudyGroup', backref='messages', lazy=True)
    message_date = db.Column(db.DateTime, nullable=False)
    message = db.Column(db.Text, nullable=False)
    
    def __repr__(self):
        return f'<Message {self.id} from {self.user_id} to {self.study_group_id}>'