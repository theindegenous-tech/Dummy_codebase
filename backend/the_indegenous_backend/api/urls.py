from django.urls import path
from the_indegenous_backend.api import views

urlpatterns = [
    path('library/', views.book_list),
    path('library/<int:pk>/', views.book_detail),
    path('library/search/', views.search)
]