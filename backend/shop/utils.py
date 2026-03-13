import requests
import base64
from datetime import datetime
from django.conf import settings

class MpesaClient:
    def __init__(self):
        self.consumer_key = "YOUR_CONSUMER_KEY"
        self.consumer_secret = "YOUR_CONSUMER_SECRET"
        self.shortcode = "174379" # Sandbox shortcode
        self.passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"

    def get_token(self):
        url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        response = requests.get(url, auth=(self.consumer_key, self.consumer_secret))
        return response.json().get('access_token')

    def stk_push(self, phone, amount, order_id):
        token = self.get_token()
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        password = base64.b64encode(f"{self.shortcode}{self.passkey}{timestamp}".encode()).decode()
        
        headers = {"Authorization": f"Bearer {token}"}
        payload = {
            "BusinessShortCode": self.shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phone, # e.g. 254712345678
            "PartyB": self.shortcode,
            "PhoneNumber": phone,
            "CallBackURL": "https://your-domain.com/api/mpesa/callback/",
            "AccountReference": f"NB-PITCH-{order_id}",
            "TransactionDesc": "Jersey Purchase"
        }
        
        response = requests.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/query",
            json=payload,
            headers=headers
        )
        return response.json()