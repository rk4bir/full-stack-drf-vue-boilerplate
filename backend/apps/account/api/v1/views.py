from rest_framework.generics import (
    RetrieveAPIView,
    UpdateAPIView
)
from rest_framework.permissions import IsAuthenticated

from apps.account.models import Account
from .serializers import RetrieveSerializer, UpdateSerializer
from .permissions import IsOwnerOrAdmin


class Retrieve(RetrieveAPIView):
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]
    serializer_class = RetrieveSerializer
    lookup_field = 'username'
    queryset = Account.objects.all()


class Update(UpdateAPIView):
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]
    serializer_class = UpdateSerializer
    lookup_field = 'username'
    queryset = Account.objects.all()
