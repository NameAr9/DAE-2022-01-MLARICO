from django.urls import path

from . import views

urlpatterns = [
    path('productos', views.Productosview.as_view(), name='producto'),
    
]   