from app import db

class FeatureRequest(db.Model):
    id = db.Column(db.Integer, primary_key = True, autoincrement=True)

    title = db.Column(db.String)

    description = db.Column(db.String)

    priority = db.Column(db.Integer)

    target_date = db.Column(db.Date)

    ticket_url = db.Column(db.String)

    client_id = db.Column(db.Integer, db.ForeignKey('client.id'))
    client = db.relationship('Client',
                               backref=db.backref('features', lazy='dynamic'))

    product_area = db.Column(db.Enum('Policies', 'Billing', 'Claims', 'Reports'))


    def to_dict(self):
        print self, self.client_id
        return dict(
            title = self.title,
            description = self.description,
            priority = self.priority,
            targetDate = self.target_date.isoformat(),
            ticketUrl = self.ticket_url,
            client = self.client.to_dict(),
            productArea = { 'id' : self.product_area },
            id = self.id
        )

    def __repr__(self):
        return '<Feature_request %r>' % (self.id)
