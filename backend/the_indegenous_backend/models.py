from django.db import models
import datetime
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.


def current_year():
    return datetime.date.today().year

def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)

class Language(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)

class Country(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)

class Genre(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)

class Author(models.Model):
    id = models.BigAutoField(primary_key=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

class Publisher(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=255)
    authors = models.ManyToManyField(Author)
    country = models.ManyToManyField(Country)

class Book(models.Model):
    id = models.BigAutoField(primary_key=True)
    isbn = models.PositiveBigIntegerField
    title = models.CharField(max_length=255)
    year = models.PositiveIntegerField(default=current_year(), validators=[MinValueValidator(1), max_value_current_year])
    description = models.TextField()
    pages = models.IntegerField
    countries = models.ManyToManyField(Country)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    author = models.ManyToManyField(Author)
    publisher = models.ManyToManyField(Publisher)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, related_name='bookgenre')
    sub_genre = models.ForeignKey(Genre, on_delete=models.CASCADE, related_name='booksubgenre')
    file = models.FileField(upload_to='Books/')