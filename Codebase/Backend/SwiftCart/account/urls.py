from django.urls import path


from .views import RegisterUserView, LoginUserView, LogoutUserView

app_name = "account"
urlpatterns = [
    path("auth/signup/", RegisterUserView.as_view(), name="register"),
    path("auth/login/", LoginUserView.as_view(), name="login"),
    path("auth/logout/", LogoutUserView.as_view(), name="logout"),
]