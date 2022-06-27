from django.urls import path
from users.api import views

urlpatterns = [
    path('login/', views.login_user),
    path('signup/', views.signup_user),
    path('user/', views.userView),
    path('logout/', views.logout_user),
    path('personalisation/', views.add_to_list_of_personalisation),
    path('personalisation/<int:pk>/', views.personalisation_detail),
]