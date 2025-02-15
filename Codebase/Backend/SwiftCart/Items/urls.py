from django.urls import path

from .views import ItemsListView

app_name = 'Items'
urlpatterns = [
    path("", ItemsListView.as_view(), name="items-list"),
]