from flask import Flask, redirect, render_template, render_template_string, url_for, request, abort
from flask_mail import Mail
from flask.ext.sqlalchemy import SQLAlchemy
from flask_user import login_required, UserManager, UserMixin, SQLAlchemyAdapter, current_user
from flask_admin import Admin

# Bootstrap main app
app = Flask(__name__, static_url_path='')
app.config.from_object('config')
db = SQLAlchemy(app)

# Import models
from app.models import client
from app.models import user
from app.models import feature_request

# Import Routes
from app.routes import index
from app.routes import clients
from app.routes import feature_requests

#import views
from app.views import admin_views


# Setup Flask-User
db_adapter = SQLAlchemyAdapter(db, user.User)
user_manager = UserManager(db_adapter, app)
mail = Mail(app)


# Create admin user on start up
@app.before_first_request
def create_user():
    admin_config = app.config.get('ADMIN')
    print admin_config
    username = admin_config['username']
    password = admin_config['password']
    email = admin_config['email']
    if not user.User.query.filter(user.User.username == username).first():
        admin_user = user.User(username=username, email=email, is_enabled=True,
                     password=user_manager.hash_password(password))

        admin_user.roles.append(user.Role(name='admin'))
        db.session.add(admin_user)
        db.session.commit()


# add models to be managed via Flask Admin iinterface
admin = Admin(app, name='britc-sample-app', base_template='my_master.html', template_mode='bootstrap3')
admin.add_view(admin_views.MyModelView(user.User, db.session))
admin.add_view(admin_views.MyModelView(client.Client, db.session))
admin.add_view(admin_views.MyModelView(user.Role, db.session))
admin.add_view(admin_views.MyModelView(user.UserRoles, db.session))
