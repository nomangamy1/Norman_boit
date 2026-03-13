from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.PositiveIntegerField() # KES
    image = models.ImageField(upload_to='jerseys/')
    is_available = models.BooleanField(default=True)
    description = models.TextField(blank=True)

class Order(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending Payment'),
        ('PAID', 'Paid - Awaiting Printing'),
        ('PRINTED', 'Printed - Ready'),
        ('COMPLETED', 'Collected/Delivered'),
    ]
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15) # For M-PESA
    custom_name = models.CharField(max_length=15, blank=True) # "KIPCHOGE"
    custom_number = models.CharField(max_length=3, blank=True) # "01"
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    transaction_id = models.CharField(max_length=50, blank=True) # M-PESA Code