from flask import Flask, url_for
from flask_mail import Mail
from flask.ext.sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore
from flask_admin import Admin, helpers as admin_helpers
from flask_security.utils import encrypt_password
from flask_cors import CORS


# Bootstrap main app
app = Flask(__name__, static_url_path='')
app.config.from_object('config')
db = SQLAlchemy(app)
CORS(app)

# Import models
from app.models import client
from app.models import user
from app.models import feature_request

# Import Routes
from app.routes import index
from app.routes import clients
from app.routes import feature_requests

# import views
from app.views import admin_views

# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, user.User, user.Role)
security = Security(app, user_datastore)
mail = Mail(app)


@app.before_first_request
def create_user():
    '''
    create default admin user on start up
    '''
    admin_config = app.config.get('ADMIN')
    username = admin_config['username']
    password = admin_config['password']
    email = admin_config['email']
    if not user.User.query.filter(user.User.username == username).first():
        admin_user = user.User(username=username, email=email, is_enabled=True,
                               password=encrypt_password(password))

        admin_user.roles.append(user.Role(name='admin'))
        db.session.add(admin_user)
        db.session.commit()

# add models to be managed via Flask Admin iinterface
admin = Admin(app, name='britc-sample-app',
              base_template='my_master.html', template_mode='bootstrap3')
admin.add_view(admin_views.MyModelView(user.User, db.session))
admin.add_view(admin_views.MyModelView(client.Client, db.session))
admin.add_view(admin_views.MyModelView(user.Role, db.session))
admin.add_view(admin_views.MyModelView(user.UserRoles, db.session))

# define a context processor for merging flask-admin's template context into the
# flask-security views.
@security.context_processor
def security_context_processor():
    return dict(
        admin_base_template=admin.base_template,
        admin_view=admin.index_view,
        h=admin_helpers,
        get_url=url_for
    )
