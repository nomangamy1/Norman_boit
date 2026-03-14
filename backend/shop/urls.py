from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, OrderViewSet, process_payment

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('process-payment/', process_payment, name='process_payment'),
    path('mpesa/callback/', mpesa_callback, name='mpesa_callback'),

]