from flask import url_for, abort, request, redirect
from flask_admin.contrib.sqla import ModelView
from flask_security import current_user


# Create customized model view class
class MyModelView(ModelView):

    def is_accessible(self):
        return current_user and current_user.is_authenticated and current_user.has_role('admin')

    def _handle_view(self, name, **kwargs):
        """
        Override builtin _handle_view in order to redirect users when a view is not accessible.
        """
        if not self.is_accessible():
            if current_user.is_authenticated:
                # permission denied
                abort(403)
            else:
                # login
                return redirect(url_for('security.login', next=request.url))
