import requests
import base64
from datetime import datetime
from django.conf import settings

class MpesaClient:
    def __init__(self):
        # Pro-tip: Move these to your .env file later for security
        self.consumer_key = "YOUR_CONSUMER_KEY"
        self.consumer_secret = "YOUR_CONSUMER_SECRET"
        self.shortcode = "174379" 
        self.passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"

    def get_token(self):
        url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        try:
            response = requests.get(url, auth=(self.consumer_key, self.consumer_secret))
            return response.json().get('access_token')
        except Exception as e:
            print(f"Token Error: {e}")
            return None

    def stk_push(self, phone, amount, order_id):
        token = self.get_token()
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        
        # Format phone to 254XXXXXXXXX
        if phone.startswith('0'):
            phone = '254' + phone[1:]
        elif phone.startswith('+'):
            phone = phone.replace('+', '')

        password = base64.b64encode(f"{self.shortcode}{self.passkey}{timestamp}".encode()).decode()
        
        headers = {"Authorization": f"Bearer {token}"}
        payload = {
            "BusinessShortCode": self.shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": int(amount), # Safaricom expects an integer
            "PartyA": phone,
            "PartyB": self.shortcode,
            "PhoneNumber": phone,
            "CallBackURL": "https://your-ngrok-url.ngrok-free.app/api/mpesa/callback/", 
            "AccountReference": f"NB{order_id}",
            "TransactionDesc": "Pitchside Kit Purchase"
        }
        
        # CORRECTED ENDPOINT: Changed from /query to /processrequest
        url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        
        response = requests.post(url, json=payload, headers=headers)
        return response.json()