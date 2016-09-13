from app import app
import unittest


class FeatureRequestTestCase(unittest.TestCase):

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_app(self):
        self.app = app.test_client()
        assert app is not None
        assert self.app is not None

