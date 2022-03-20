from rest_framework.serializers import ModelSerializer
from apps.account.models import Account


class RetrieveSerializer(ModelSerializer):

    class Meta:
        model = Account
        fields = ["first_name", "last_name", "username", "email", "phone", "created_at", "updated_at"]


class UpdateSerializer(ModelSerializer):

    class Meta:
        model = Account
        fields = ["first_name", "last_name", "email", "phone"]
