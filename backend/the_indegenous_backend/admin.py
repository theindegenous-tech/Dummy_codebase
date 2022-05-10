from django.contrib import admin
from the_indegenous_backend.models import Book, Language, Author, Publisher, Country, Genre

# Register your models here.


@admin.register(Language)
class BookAdmin(admin.ModelAdmin):
    pass

@admin.register(Country)
class BookAdmin(admin.ModelAdmin):
    pass

@admin.register(Genre)
class BookAdmin(admin.ModelAdmin):
    pass

@admin.register(Author)
class BookAdmin(admin.ModelAdmin):
    pass

@admin.register(Publisher)
class BookAdmin(admin.ModelAdmin):
    pass

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    pass