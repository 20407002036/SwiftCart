from django.urls import path


from .views import RegisterUserView, LoginUserView, LogoutUserView

app_name = "account"
urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("login/", LoginUserView.as_view(), name="login"),
    path("logout/", LogoutUserView.as_view(), name="logout"),
]