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
    country = models.OneToOneField(Country, on_delete=models.CASCADE)

class Publisher(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=80)
    authors = models.ForeignKey(Author, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

class Book(models.Model):
    id = models.BigAutoField(primary_key=True)
    isbn = models.PositiveBigIntegerField
    title = models.CharField(max_length=80)
    year = models.DateField
    description = models.CharField(max_length=200)
    pages = models.IntegerField
    countries = models.ForeignKey(Country, on_delete=models.CASCADE)
    language = models.OneToOneField(Language, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    genre = models.OneToOneField(Genre, on_delete=models.CASCADE, related_name='bookgenre')
    sub_genre = models.OneToOneField(Genre, on_delete=models.CASCADE, related_name='booksubgenre')
