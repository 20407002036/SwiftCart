from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "FirstName", "LastName", "Email", "password"]
        extra_kwargs = {
            'password': {'write_only': True}
        }


    def validate(self, data):
        # This to be done on the Fronetend
        # if data["password"] != data.get("password2"):
        #     raise serializers.ValidationError({"Password": "Passwords do not match."})
        email = data.get('Email')
        if User.objects.filter(Email=email).exists():
            raise serializers.ValidationError({"Email": "Email already exists"})
        
        required_fields = ['Email', 'password', 'FirstName', 'LastName']
        for field in required_fields:
            if not data.get(field):
                raise serializers.ValidationError({field: f"{field} is required"})
            
        password = data.get("password")
        if len(password) < 8:
            raise serializers.ValidationError({"Password": "Password must be at least 8 characters."})
        
        return data
    

    def create(self, validated_data):
        # Harshed pass
        validated_data['password'] = make_password(validated_data.get('password'))
        user = User.objects.create(**validated_data)
        return user
    

class LoginUserSerializer(TokenObtainPairSerializer):
    username_field='Email'
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["Email"] = user.Email
        return token
    def validate(self, attrs):
        attrs['username'] = attrs.get('Email')
        data = super().validate(attrs)

        data['user'] = {
            'id': str(self.user.id),
            'Email': self.user.Email,
            'FirstName': self.user.FirstName,
            'LastName': self.user.LastName,
        }
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