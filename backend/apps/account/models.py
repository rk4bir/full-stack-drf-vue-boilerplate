from django.db import models
from django.contrib.auth.models import AbstractUser


class Account(AbstractUser):
    # basic
    first_name = models.CharField(max_length=32, blank=False, null=False)
    last_name = models.CharField(max_length=32, blank=False, null=False)

    # identifiers
    username = models.CharField(max_length=32, blank=False, null=False, unique=True)
    email = models.CharField(max_length=255, blank=False, null=False, unique=True)
    phone = models.CharField(max_length=32, blank=True, null=True, unique=True)

    # timestamps
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        ordering = ["-created_at", "first_name"]

    def __str__(self):
        return f"{self.name} - {self.username}"

    @property
    def name(self):
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.username.capitalize()
