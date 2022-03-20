from rest_framework.permissions import BasePermission


class IsOwnerOrAdmin(BasePermission):

    def has_object_permission(self, request, view, obj):
        """Check whether requested user is superuser or account owner"""
        return request.user.is_superuser or request.user == obj
