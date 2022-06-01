from django.urls import path
from users.api import views

urlpatterns = [
    path('login/', views.login_user),
    path('signup/', views.signup_user),
    path('user/', views.UserView),
    path('logout/', views.logout_user)
]