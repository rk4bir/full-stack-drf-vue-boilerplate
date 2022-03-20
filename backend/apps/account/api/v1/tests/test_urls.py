import pytest


@pytest.mark.unit
def test_token_endpoints(api_client, endpoint):
    tokens_url = f"{endpoint}/token/both/"
    token_refresh_url = f"{endpoint}/token/refresh/"
    resp = api_client.post(tokens_url)
    assert resp.status_code != 404

    resp = api_client.post(token_refresh_url)
    assert resp.status_code != 404
