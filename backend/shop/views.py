from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import MpesaClient
from .models import Order

@api_view(['POST'])
def process_payment(request):
    data = request.data
    phone = data.get('phone')
    amount = data.get('amount')
    order_id = data.get('order_id')

    # Format phone number to 254...
    if phone.startswith('0'):
        phone = '254' + phone[1:]

    mpesa = MpesaClient()
    response = mpesa.stk_push(phone, amount, order_id)
    
    return Response(response)