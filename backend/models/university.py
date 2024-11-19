from . import db

class University(db.Model):
    __tablename__ = 'universities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    state_id = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=False)
    users = db.relationship('User', backref='university', lazy=True)
    courses = db.relationship('Course', backref='university', lazy=True)
    
    def __repr__(self):
        return f'<University {self.name}>'
