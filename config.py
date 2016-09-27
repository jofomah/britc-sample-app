import os

basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')


ADMIN = {
    'username': os.environ.get('ADMIN_USER'),
    'password': os.environ.get('ADMIN_PASS'),
    'email': os.environ.get('ADMIN_EMAIL')
}
# disable CSRF for auth api access from client side
CSRF_ENABLED = True

#secret key used for hashing
SECRET_KEY = os.environ.get('SECRET_KEY', 'secret_key')

# for older versions of flask mail DEFAULT_MAIL_SENDER
DEFAULT_MAIL_SENDER = os.environ.get('MAIL_USERNAME', '"Britc Email Service" <jideobibritc@gmail.com>')
MAIL_USERNAME = os.environ.get('MAIL_SENDER', 'jideobibritc@gmail.com')
MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
# for newer version
MAIL_DEFAULT_SENDER = os.environ.get('MAIL_USERNAME', '"Britc Email Service" <jideobibritc@gmail.com>')
MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 465
MAIL_USE_SSL = True
MAIL_USE_TLS = False

#Flask security config
SECURITY_PASSWORD_SALT = SECRET_KEY
SECURITY_PASSWORD_HASH = 'bcrypt'
SECURITY_URL_PREFIX = '/auth'
SECURITY_POST_LOGOUT_VIEW = 'security.login'
SECURITY_POST_LOGIN_VIEW = 'admin.index'
SECURITY_REGISTERABLE = True
SECURITY_RECOVERABLE = True
SECURITY_CHANGEABLE = True
SECURITY_SEND_REGISTER_EMAIL = True
