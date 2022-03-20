from django.contrib.auth import get_user_model
import pytest


@pytest.mark.unit
def test_auth_model(auth_model):
    user = get_user_model()()
    assert isinstance(user, auth_model)
