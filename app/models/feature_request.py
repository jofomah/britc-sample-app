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

    def swap_priority(self, current_entity):
        self.priority = current_entity.priority

    @classmethod
    def get_list_by(cls, client_id):
        return FeatureRequest.query.filter(FeatureRequest.client_id == client_id)\
            .order_by('priority desc').all()

    @classmethod
    def get_similar_by(cls, client_id, priority):
        return FeatureRequest.query.filter(FeatureRequest.client_id == client_id,
                                           FeatureRequest.priority == priority).first()

    @classmethod
    def get_other_same_client_and_priority(cls, updated_record):
        '''
        This is used to get record that has same priority as updated record.
        :param updated_record: feature request to be saved
        :return: feature request that is same client and new priority of "updated_record"
        '''
        return FeatureRequest.query.filter(FeatureRequest.client_id == updated_record.client_id,
                                           FeatureRequest.priority == updated_record.priority,
                                           FeatureRequest.id != updated_record.id).first()
