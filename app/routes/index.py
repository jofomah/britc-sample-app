from app import app
from flask import Flask, render_template, request, make_response, session, jsonify
from authomatic.adapters import WerkzeugAdapter
from authomatic import Authomatic


authomatic_instance = Authomatic(app.config.get('CONFIG', None), app.config.get('secret_key', ''))


@app.route('/')
def root():
    print request.json, session
    return app.send_static_file('index.html')

@app.route('/login/<provider_name>/', methods=['GET', 'POST'])
def login(provider_name):
    print 'Provider Name : ', provider_name
    response = make_response()
    result = authomatic_instance.login(WerkzeugAdapter(request, response), provider_name,
                                       session=session, session_saver=lambda: app.save_session(session, response))

    print 'result : ', result, session

    if result:
        if result.user:
            result.user.update()
            print result.user.credentials.token
        return jsonify({ 'username': result.user.username})
    return response
