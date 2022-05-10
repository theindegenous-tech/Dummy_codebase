from dataclasses import field, fields
from rest_framework import serializers
from the_indegenous_backend.models import Book, Author, Publisher, Genre, Language, Country


class LanguageSerializer(serializers.ModelSerializer):

    class Meta:
        model=Language
        fields = '__all__'

class CountrySerializer(serializers.ModelSerializer):

    class Meta:
        model=Country
        fields = '__all__'

class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model=Genre
        fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):

    # country = CountrySerializer(read_only=True)

    class Meta:
        model=Author
        fields = '__all__'

class PublisherSerializer(serializers.ModelSerializer):

    # authors = AuthorSerializer(read_only=True)

    class Meta:
        model=Publisher
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    countries = CountrySerializer(read_only=True)
    genre = GenreSerializer(read_only=True)
    author = AuthorSerializer(read_only=True)
    language = LanguageSerializer(read_only=True)
    publisher = PublisherSerializer(read_only=True)
    class Meta:
        model=Book
        fields = '__all__'