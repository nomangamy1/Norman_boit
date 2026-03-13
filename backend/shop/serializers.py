from rest_framework import serializers
from .models import Product, Order

class ProductSerializer(serializers.ModelSerializer):
    class ImageSerializer(serializers.ModelSerializer):
        class Meta:
            model = Product
            fields = ['id', 'name', 'price', 'image', 'description', 'is_available']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'