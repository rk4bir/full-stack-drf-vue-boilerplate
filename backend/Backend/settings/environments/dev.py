import os
from datetime import timedelta
from ..base import *

# secret key
SECRET_KEY = os.environ.get("SECRET_KEY", 'django-insecure-vg98uymuvfkq@e3bpxc3(3!!3vaq93v^=at=08li94w5n7!wv7')

# Installed apps
THIRD_PARTY_APPS = [
    'corsheaders',
]
BACKEND_APPS = [
    'apps.account'
]
INSTALLED_APPS += THIRD_PARTY_APPS + BACKEND_APPS

# Allowed hosts
ALLOWED_HOSTS = ['*']

# Auth model
AUTH_USER_MODEL = 'account.Account'


# CORS allowed origins
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost",
    "http://127.0.0.1"
]

# Simple JWT config
SIMPLE_JWT_SIGNING_KEY = SECRET_KEY
JWT_AUTH_HEADER = 'Token'
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=3),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SIMPLE_JWT_SIGNING_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'AUTH_HEADER_TYPES': (JWT_AUTH_HEADER,),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}


# DRF config
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'TEST_REQUEST_DEFAULT_FORMAT': 'json',
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    )
}