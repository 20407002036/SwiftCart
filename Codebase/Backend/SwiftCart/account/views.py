from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status

# Create your views here.
from .serializers import UserSerializer, LoginUserSerializer, LogoutSerializer


class RegisterUserView(GenericAPIView):

    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user=serializer.save()
            token = RefreshToken.for_user(user)
            data = serializer.data
            data["token"] = {
                "refresh": str(token),
                "access": str(token.access_token),
            }
            data["message"] = "User created successfully"
            return Response(data, status=status.HTTP_201_CREATED)
        
        else:
            return Response({
                "message": "User not created",
                "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST
                )
        
class LoginUserView(TokenObtainPairView):

    serializer_class = LoginUserSerializer


class LogoutUserView(GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)