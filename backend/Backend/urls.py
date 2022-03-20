from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('v1/account/', include('apps.account.api.v1.urls')),
    path('admin/', admin.site.urls),
]
