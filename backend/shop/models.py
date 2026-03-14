from django.db import models
import uuid

class Product(models.Model):
    # Matches the categories in your Navbar
    CATEGORY_CHOICES = [
        ('arrivals', 'New Arrival'),
        ('leagues', 'Leagues'),
        ('gadgets', 'Gadgets'),
        ('printing', 'Custom Printing Service'),
    ]

    name = models.CharField(max_length=200)
    price = models.PositiveIntegerField()  # KES
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='arrivals')
    image = models.ImageField(upload_to='products/')
    is_available = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False) # For the Home Page highlight
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"

class Order(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending Payment'),
        ('PAID', 'Paid - Processing'),
        ('PRINTED', 'Printed - Ready'),
        ('COMPLETED', 'Collected/Delivered'),
        ('FAILED', 'Payment Failed'),
    ]
    
    # Unique reference for M-Pesa tracking
    order_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    customer_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    total_amount = models.PositiveIntegerField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    transaction_id = models.CharField(max_length=50, blank=True) # M-PESA Code
    checkout_request_id = models.CharField(max_length=100, blank=True) # For STK Push tracking
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.order_id} by {self.customer_name}"

class OrderItem(models.Model):
    """Allows multiple products in a single order"""
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    selected_size = models.CharField(max_length=5, default='M')
    custom_name = models.CharField(max_length=15, blank=True)
    custom_number = models.CharField(max_length=3, blank=True)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} ({self.selected_size})"