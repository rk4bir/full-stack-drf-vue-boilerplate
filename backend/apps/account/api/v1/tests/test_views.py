from django.contrib.auth import get_user_model
import pytest

User = get_user_model()


@pytest.mark.unit
def test_token_pair_view(api_client, endpoint, user_password):
    user, password = user_password
    req_url = f"{endpoint}/token/both/"
    # try with correct credentials
    data = {"username": user.username, "password": password}
    resp = api_client.post(req_url, data=data)
    assert resp.status_code == 200

    # try with incorrect credentials
    data = {"username": user.username, "password": 'wrong_password'}
    resp = api_client.post(req_url, data=data)
    assert resp.status_code != 200


@pytest.mark.unit
def test_token_refresh_view(api_client, endpoint, user_password):
    user, password = user_password
    token_url = f"{endpoint}/token/both/"
    # obtain token pairs
    data = {"username": user.username, "password": password}
    resp = api_client.post(token_url, data=data)
    tokens = resp.json()

    # try with correct refresh token
    refresh_url = f"{endpoint}/token/refresh/"
    data = {"refresh": tokens['refresh']}
    resp = api_client.post(refresh_url, data=data)
    assert resp.status_code == 200

    # try with incorrect refresh token
    data = {"refresh": "incorrect_token"}
    resp = api_client.post(refresh_url, data=data)
    assert resp.status_code != 200
