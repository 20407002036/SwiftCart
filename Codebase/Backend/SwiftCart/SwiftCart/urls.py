"""
URL configuration for SwiftCart project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include


api_url_patterns = [
    path("items/", include("Items.urls", namespace="items")),
    path("account/", include("account.urls", namespace="account")),
    path("products/", include("products.urls", namespace="products")),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include((api_url_patterns, "api"), namespace="api")),
    path("",include("products.urls", namespace="products")),
]
