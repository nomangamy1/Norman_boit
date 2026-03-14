from django.contrib import admin
from .models import Product, Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0 # Don't show empty rows by default
    readonly_fields = ('product', 'selected_size', 'custom_name', 'custom_number', 'quantity')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_available', 'is_featured')
    list_filter = ('category', 'is_available', 'is_featured')
    search_fields = ('name',)
    list_editable = ('price', 'is_available', 'is_featured')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'customer_name', 'total_amount', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('customer_name', 'phone_number', 'transaction_id')
    list_editable = ('status',)
    inlines = [OrderItemInline] # Shows the jerseys inside the order