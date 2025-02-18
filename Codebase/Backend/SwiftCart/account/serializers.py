from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth.hashers import make_password
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "FirstName", "LastName", "Email", "password", "password2"]


    def validate(self, data):
        if data["password"] != data.get("password2"):
            raise serializers.ValidationError({"Password": "Passwords do not match."})
        password = data.get("password")
        if len(password) < 8:
            raise serializers.ValidationError({"Password": "Password must be at least 8 characters."})
        
        return data
    

    def create(self, validated_data):
        validated_data.pop("password2")
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.password = make_password(password)
        user.save()
        return user
    

class LoginUserSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.Email
        return token
    def validate(self, attrs):
        data = super().validate(attrs)
        data["message"] = "Login was successful"
        return data

class LogoutSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs["refresh_token"]
        return attrs    
    
    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            raise serializers.ValidateError(
                {"bad_token": "Token is invalid or expired"}
            )