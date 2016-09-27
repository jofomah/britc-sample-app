from app import app, db
from app.models import client
from flask import abort, jsonify, request
from flask_security import auth_token_required
import json

@app.route('/api/clients', methods = ['GET'])
@auth_token_required
def get_all_Clients():
    entities = client.Client.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/api/clients/<int:id>', methods = ['GET'])
@auth_token_required
def get_Client(id):
    entity = client.Client.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/api/clients', methods = ['POST'])
@auth_token_required
def create_Client():
    entity = client.Client(
        name = request.json['name']
    )
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/api/clients/<int:id>', methods = ['PUT'])
@auth_token_required
def update_Client(id):
    entity = client.Client.query.get(id)
    if not entity:
        abort(404)
    entity = client.Client(
        name = request.json['name'],
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 200

@app.route('/api/clients/<int:id>', methods = ['DELETE'])
@auth_token_required
def delete_Client(id):
    entity = client.Client.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
