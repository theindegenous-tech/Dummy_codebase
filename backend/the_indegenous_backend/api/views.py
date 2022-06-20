# from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from the_indegenous_backend.models import Book
from the_indegenous_backend.api.serializers import BookSerializer
from the_indegenous_backend.utils import trie
# Create your views here.

keys = ["hello", "dog", "hell", "cat", "a", "help", "helps", "helping"]  # keys to form the trie structure.
t = trie.Trie()
# creating the trie structure with the
# given set of strings.
t.formTrie(keys)

@api_view(['GET', 'POST'])
def book_list(request):
    """
    List all books, or create a new book.
    """
    if request.method == 'GET':
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = BookSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
def book_detail(request, pk):
    """
    Retrieve, update or delete a book.
    """
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        serializer = BookSerializer(book)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        book.delete()
        return Response(status=204)

# Driver Code
@api_view(['POST'])
def search(request):
    key = "h"  # key for autocomplete suggestions.    
    # autocompleting the given key using
    # our trie structure.
    comp = t.printAutoSuggestions(key)
    
    if comp == -1:
        print("No other strings found with this prefix\n")
    elif comp == 0:
        print("No string found with this prefix\n")
    return Response(status=201)