import os
from authomatic.providers import oauth2, oauth1, openid

basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')

CONFIG = {

    'tw': { # Your internal provider name

        # Provider class
        'class_': oauth1.Twitter,

        # Twitter is an AuthorizationProvider so we need to set several other properties too:
        'consumer_key': os.environ.get('TWITTER_CONSUMER_KEY', ''),
        'consumer_secret': os.environ.get('TWITTER_CONSUMER_SECRET', ''),
    },

    'fb': {

        'class_': oauth2.Facebook,

        # Facebook is an AuthorizationProvider too.
        'consumer_key': '########################',
        'consumer_secret': '########################',

        # But it is also an OAuth 2.0 provider and it needs scope.
        'scope': ['user_about_me', 'email', 'publish_stream'],
    },

    'oi': {

        # OpenID provider dependent on the python-openid package.
        'class_': openid.OpenID,
    }
}

SECRET_KEY = 'secret_key'
SECURITY_URL_PREFIX = '/api'
# SECURITY_LOGIN_URL = 'api/login'
# SECURITY_LOGOUT_URL = 'api/logout'
# SECURITY_REGISTER_URL = 'api/register'
# SECURITY_RESET_URL = 'api/reset'
# SECURITY_CHANGE_URL = 'api/change'
# SECURITY_CONFIRM_URL = 'api/confirm'
# SECURITY_POST_LOGOUT_VIEW = 'login'
