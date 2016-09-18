from app import db

class Client(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, unique=True)

    def to_dict(self):
        return dict(
            name = self.name,
            id = self.id
        )

    def __repr__(self):
        return '<Client %r>' % (self.id)
