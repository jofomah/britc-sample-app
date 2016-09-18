from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='')
app.config.from_object('config')
db = SQLAlchemy(app)


from app.models import client
from app.models import feature_request
from app.routes import index

from app.routes import clients
from app.routes import feature_requests
