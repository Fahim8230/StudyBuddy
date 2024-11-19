from . import db

class State(db.Model):
    __tablename__ = 'states'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    abbreviation = db.Column(db.String(2), nullable=True)
    users = db.relationship('User', backref='state', lazy=True)
    universities = db.relationship('University', backref='state', lazy=True)

    def __repr__(self):
        return f'<State {self.name}>'