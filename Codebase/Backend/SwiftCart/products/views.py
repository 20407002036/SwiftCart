from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def list(self, request):
        category = request.query_params.get('category', None)
        queryset = self.get_queryset()

        if category and category != 'all':
            queryset = queryset.filter(category=category)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def featured(self, request):
        featured_products = self.get_queryset().order_by('?')[:4]  # Random 4 products
        serializer = self.get_serializer(featured_products, many=True)
        return Response(serializer.data)