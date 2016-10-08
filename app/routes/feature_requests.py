from app import app, db
from app.models import feature_request, client
from flask import abort, jsonify, request, make_response
from flask_security import auth_token_required
import datetime
import json

@app.route('/api/feature_requests', methods = ['GET'])
@auth_token_required
def get_all_feature_requests():
    entities = feature_request.FeatureRequest.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/api/feature_requests/<int:id>', methods = ['GET'])
@auth_token_required
def get_feature_request(id):
    entity = feature_request.FeatureRequest.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/api/feature_requests', methods = ['POST'])
@auth_token_required
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

    conflict_entity = feature_request.FeatureRequest.get_similar_by(entity.client_id, entity.priority)
    if conflict_entity:
        sorted_client_features = feature_request.FeatureRequest.get_list_by(entity.client_id)
        if sorted_client_features:
            least_priority_feature =  sorted_client_features[-len(sorted_client_features)]
            conflict_entity.priority = least_priority_feature.priority + 1
            db.session.add(conflict_entity)

    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/api/feature_requests/<int:id>', methods = ['PUT'])
@auth_token_required
def update_feature_request(id):
    entity = feature_request.FeatureRequest.query.get(id)
    if not entity:
        abort(404)

    updated_entity = feature_request.FeatureRequest(
        title = request.json['title'],
        description = request.json['description'],
        priority = request.json['priority'],
        target_date = datetime.datetime.strptime(request.json['targetDate'], "%Y-%m-%d").date(),
        ticket_url = request.json['ticketUrl'],
        client_id = request.json['client'].get('id', None),
        product_area = request.json['productArea'].get('id', None),
        id = id
    )

    conflict_entity = feature_request.FeatureRequest.get_other_same_client_and_priority(updated_entity)
    if conflict_entity:
        conflict_entity.swap_priority(entity)
        db.session.merge(conflict_entity)

    db.session.merge(updated_entity)
    db.session.commit()
    return jsonify(feature_request.FeatureRequest.query.get(id).to_dict()), 200

@app.route('/api/feature_requests/<int:id>', methods = ['DELETE'])
@auth_token_required
def delete_feature_request(id):
    entity = feature_request.FeatureRequest.query.get(id)
    if not entity:
        abort(make_response('Feature request with id : {}, does not exist'.format(id), 404))
    db.session.delete(entity)
    db.session.commit()
    return '', 204

