from app import app, db
from app.models import feature_request, client
from flask import abort, jsonify, request, make_response
import datetime
import json

@app.route('/api/feature_requests', methods = ['GET'])
def get_all_feature_requests():
    entities = feature_request.FeatureRequest.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/api/feature_requests/<int:id>', methods = ['GET'])
def get_feature_request(id):
    entity = feature_request.FeatureRequest.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/api/feature_requests', methods = ['POST'])
def create_feature_request():
    entity = feature_request.FeatureRequest(
        title = request.json['title']
        , description = request.json['description']
        , priority = request.json['priority']
        , target_date = datetime.datetime.strptime(request.json['targetDate'], "%Y-%m-%d").date()
        , ticket_url = request.json['ticketUrl']
        , client_id = request.json['client'].get('id', None)
        , product_area = request.json['productArea'].get('id', None)
    )

    client_record = client.Client.query.get(entity.client_id)
    if not client_record:
        abort(make_response('Client with id : {}, does not exist'.format(entity.client_id), 404))
    #TODO: rearrange by client priority
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/api/feature_requests/<int:id>', methods = ['PUT'])
def update_feature_request(id):
    entity = feature_request.FeatureRequest.query.get(id)
    #TODO: rearrange by client priority
    if not entity:
        abort(404)
    entity = feature_request.FeatureRequest(
        title = request.json['title'],
        description = request.json['description'],
        priority = request.json['priority'],
        target_date = datetime.datetime.strptime(request.json['targetDate'], "%Y-%m-%d").date(),
        ticket_url = request.json['ticketUrl'],
        client_id = request.json['client'].get('id', None),
        product_area = request.json['productArea'].get('id', None),
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(feature_request.FeatureRequest.query.get(id).to_dict()), 200

@app.route('/api/feature_requests/<int:id>', methods = ['DELETE'])
def delete_feature_request(id):
    entity = feature_request.FeatureRequest.query.get(id)
    if not entity:
        abort(make_response('Feature request with id : {}, does not exist'.format(id), 404))
    db.session.delete(entity)
    db.session.commit()
    return '', 204

