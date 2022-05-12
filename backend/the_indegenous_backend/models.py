from django.db import models

# Create your models here.
class Language(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=80)

class Country(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=80)

class Genre(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=80)

class Author(models.Model):
    id = models.BigAutoField(primary_key=True)
    first_name = models.CharField(max_length=80)
    last_name = models.CharField(max_length=80)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

class Publisher(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=80)
    authors = models.ManyToManyField(Author)
    country = models.ManyToManyField(Country)

class Book(models.Model):
    id = models.BigAutoField(primary_key=True)
    isbn = models.PositiveBigIntegerField
    title = models.CharField(max_length=80)
    year = models.DateField
    description = models.CharField(max_length=200)
    pages = models.IntegerField
    countries = models.ManyToManyField(Country)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    author = models.ManyToManyField(Author)
    publisher = models.ManyToManyField(Publisher)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, related_name='bookgenre')
    sub_genre = models.ForeignKey(Genre, on_delete=models.CASCADE, related_name='booksubgenre')
    file = models.FileField(upload_to='Books/')