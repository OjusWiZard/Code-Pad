from rest_framework import serializers

from .models import User


class User_Serializer(serializers.ModelSerializer):
    year = serializers.SerializerMethodField("get_year")

    def get_year(self, user):
        return "20" + user.admission_no[:2]

    class Meta:
        model = User
        fields = ["username", "avatar", "year"]
