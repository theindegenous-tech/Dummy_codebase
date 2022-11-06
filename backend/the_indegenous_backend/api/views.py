# from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from the_indegenous_backend.models import Book
from the_indegenous_backend.api.serializers import BookSerializer
from the_indegenous_backend.utils import trie
# Create your views here.

# books = Book.objects.all()
# bookArray = BookSerializer(books, many=True).data     # keys to form the trie structure.
# keys=[]
# for book in bookArray:
#     keys.append(book['title'])
# t = trie.Trie()

# # creating the trie structure with the given set of strings.
# t.formTrie(keys)

@api_view(['GET', 'POST'])
def book_list(request):
    """
    List all books, or create a new book.
    """
    if request.method == 'GET':
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        print("books",books)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

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
    response = Response()
    # if(request.GET.get('title')):
    #     response.status=201
    #     response.data = BookSerializer(Book.objects.get(title=request.GET.get('title'))).data
    #     return response
        
    # key for autocomplete suggestions.
    # key =  request.data['searchkey']    
    # # autocompleting the given key using our trie structure.
    # comp = t.getAutoSuggestions(key)

    # if comp == -1:
    #     # No other strings found with this prefix
    #     return Response(status=404)
    # elif comp == 0:
    #     # No string found with this prefix
    #     return Response(status=404)

    # searchResults = []
    # for bookTitle in comp:
    #     bookObj = BookSerializer(Book.objects.get(title=bookTitle)).data
    #     searchResults.append(bookObj)
    
    # response.data={
    #     "suggestions":searchResults
    # }
    response.status=201
    return response