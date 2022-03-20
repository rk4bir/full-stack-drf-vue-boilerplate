import os

DJANGO_ENV = os.environ.get("DJANGO_ENV", "dev")

if DJANGO_ENV == "dev":
    from .environments.dev import *
elif DJANGO_ENV == 'prod':
    from .environments.prod import *
elif DJANGO_ENV == 'test':
    from .environments.test import *
