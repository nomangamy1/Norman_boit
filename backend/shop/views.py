from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category')
        if category:
            # Allows filtering like: /api/products/?category=leagues
            queryset = queryset.filter(category=category)
        return queryset

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

# In backend/shop/views.py
@api_view(['POST'])
def process_payment(request):
    data = request.data
    order_id = data.get('order_id')
    phone = data.get('phone')
    amount = data.get('amount')

    client = MpesaClient()
    response = client.stk_push(phone, amount, order_id)
    
    return Response(response)
@api_view(['POST'])
def mpesa_callback(request):
    # Logic for Safaricom to confirm payment
    return Response({"ResultCode": 0})