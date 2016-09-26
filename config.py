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
DEFAULT_MAIL_SENDER= os.environ.get('MAIL_SENDER', 'jideobibritc@gmail.com')
MAIL_USERNAME = os.environ.get('MAIL_USERNAME', '"Britc Email Service" <jideobibritc@gmail.com>')
MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
# for newer version
MAIL_DEFAULT_SENDER = os.environ.get('MAIL_SENDER', 'jideobibritc@gmail.com')
MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 465
MAIL_USE_SSL = True
MAIL_USE_TLS = False



#Flask user config
USER_APP_NAME = 'Britc Sample App'
USER_AFTER_LOGIN_ENDPOINT = 'admin.index'
USER_CHANGE_PASSWORD_URL      = '/auth/change-password'
USER_CHANGE_USERNAME_URL      = '/auth/change-username'
USER_CONFIRM_EMAIL_URL        = '/auth/confirm-email/<token>'
USER_EMAIL_ACTION_URL         = '/auth/email/<id>/<action>'     # v0.5.1 and up
USER_FORGOT_PASSWORD_URL      = '/auth/forgot-password'
USER_INVITE_URL               = '/auth/invite'                  # v0.6.2 and up
USER_LOGIN_URL                = '/auth/login'
USER_LOGOUT_URL               = '/auth/logout'
USER_MANAGE_EMAILS_URL        = '/auth/manage-emails'
USER_REGISTER_URL             = '/auth/register'
USER_RESEND_CONFIRM_EMAIL_URL = '/auth/resend-confirm-email'    # v0.5.0 and up
USER_RESET_PASSWORD_URL       = '/auth/reset-password/<token>'
