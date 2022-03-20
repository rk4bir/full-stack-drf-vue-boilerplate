from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from apps.account.models import Account

import pytest

User = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def endpoint():
    return '/v1/account'


@pytest.fixture
def auth_model():
    return Account


@pytest.fixture
@pytest.mark.django_db()
def user_password(db):
    password = 'root'
    user = User(
        first_name="John",
        last_name="Doe",
        username='root',
        email='root@smartbox.com',
    )
    user.set_password('root')
    user.save()
    return user, password
