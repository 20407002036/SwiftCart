from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

# Create your views here.
from .models import Items
from .serializers import ItemSerializer

class ItemsListView(ListAPIView):
    queryset = Items.objects.all()
    serializer_class = ItemSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        if not queryset.exists():
            return Response({'message': 'No items found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ItemSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)