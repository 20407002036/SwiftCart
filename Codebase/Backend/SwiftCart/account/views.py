from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.views import APIView
from .models import User

# Create your views here.
from .serializers import UserSerializer, LoginUserSerializer, LogoutSerializer, VerifyEmailSerializer
from .comms import Comms

accountComms = Comms()
class RegisterUserView(GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        print(request.data)
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                user=serializer.save()
                token = RefreshToken.for_user(user)
                data = serializer.data
                data["token"] = {
                    "refresh": str(token),
                    "access": str(token.access_token),
                }
                data["message"] = "User created successfully"
                # Email logic
                accountComms.send_email(data["Email"], data["message"], "A SwiftCart account has been Created Successfully. " +
                                        "Happy Shopping! ")
                return Response(data, status=status.HTTP_201_CREATED)
        
            else:
                print("Validation errors:", serializer.errors)
                return Response({
                    "message": "User not created",
                    "errors": serializer.errors,
                    },
                    status=status.HTTP_400_BAD_REQUEST
                    )
            
        except Exception as e:
            print("Error", str(e))
            return Response({
                "error": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
        

class VerifyEmailView(GenericAPIView):
    serializer_class = VerifyEmailSerializer

    def post(self, request):
        email = request.data.get("Email")
        verification_code = request.data.get("VerificationCode")
        try:
            user = User.objects.get(Email=email)
            if user.verification_code == verification_code:
                user.is_verified = True
                user.is_active = True
                user.verification_code = None
                user.save()
                return Response({"message": "Email verified successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Invalid verification code"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        

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