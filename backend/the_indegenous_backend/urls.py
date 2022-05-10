from django.urls import path
from the_indegenous_backend import views

urlpatterns = [
    path('library/', views.book_list),
    path('library/<int:pk>/', views.book_detail),
]