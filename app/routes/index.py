from app import app
from flask import request, make_response, jsonify, abort
from flask_security import auth_token_required, login_user
from flask_security.utils import verify_password
from app.models import user


@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/api/login', methods = ['POST'])
def login():
    '''
      This enables client applications (like AngularJS to login and get all user details about current user session
      without hitting the server after login
    '''
    # FIXME: Use something like Schema or Marshallow to validate models, request.json etc
    if request.json and ('username' in request.json) and ('password' in request.json):
        username = request.json['username']
        password = request.json['password']
        _user = user.User.query.filter(user.User.username == username).first()
        if not _user:
            return abort(make_response('User : {} does not exist.'.format(username), 404))

        if _user and _user.password and verify_password(password, _user.password) and login_user(_user):
            response = {
                'username': _user.username,
                'email': _user.email,
                'authToken': _user.get_auth_token(),
                'roles': [ role.to_dict() for role in _user.roles ]
            }
            return jsonify(response)
        else:
            return abort(make_response('Invalid password.', 400))
    else:
        return abort(make_response('Missing "username" and/or "password" field(s).', 400))
