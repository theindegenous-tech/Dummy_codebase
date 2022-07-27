from django.urls import path
from users.api import views

urlpatterns = [
    path('login/', views.login_user),
    path('signup/', views.signup_user),
    path('user/', views.userView),
    path('logout/', views.logout_user),
    path('personalisation/<int:pk>/', views.personalisation_detail),
    path('bookmarks/', views.bookmarks_list),
    path('bookmarks/<int:pk>/', views.bookmarks_detail),
]