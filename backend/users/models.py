from django.db import models
from django.contrib.auth.models import AbstractUser,  BaseUserManager
from the_indegenous_backend.models import Book
from django.utils.translation import gettext_lazy as _
import datetime


# Define a model manager for User model with no username field.
class UserManager(BaseUserManager):
    use_in_migrations = True

    # Create and save a User with the given email and password.
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('email must be set')
        if not password:
            raise ValueError('password must be set')
        currenttime = datetime.datetime.now()
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            last_login=currenttime,
            date_joined=currenttime,
            **extra_fields
            )
        user.set_password(password)
        user.save(using=self._db)
        return user

    # Create and save a regular User with the given email and password.
    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    # Create and save a SuperUser with the given email and password.
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

# Personalisation class to store preferences
class Personalisation(models.Model):
    id = models.BigAutoField(primary_key=True)
    liked = models.ManyToManyField(Book, blank=True, related_name='likedbooks')
    mylibrary = models.ManyToManyField(Book, blank=True, related_name='mylibrarybooks')

class Bookmark(models.Model):
    id = models.BigAutoField(primary_key=True)
    book_id = models.ForeignKey(Book, default=None , null=True, blank=True, on_delete=models.SET_DEFAULT)
    bookmark_name = models.CharField(blank=True, max_length=255)
    # location = models.JSONField()
    personalisation = models.ForeignKey(Personalisation, default=None , null=True, blank=True, on_delete=models.CASCADE, related_name='bookmarks')     
    
# class Location(models.Model):
#     id = models.BigAutoField(primary_key=True)
#     bookmark_name = models.CharField(blank=True, max_length=255)
#     location = models.JSONField()
#     bookmark = models.ForeignKey(Bookmark, default=None , null=True, blank=True, on_delete=models.CASCADE, related_name='locations')

# User model
class User(AbstractUser):
    username = None
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    personalisation = models.OneToOneField(Personalisation, default=None , null=True, blank=True, on_delete=models.CASCADE)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()

