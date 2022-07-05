from googleapiclient.discovery import build
import json


def get_books_data(query):
    """Retriving data from google books API"""

    service = build('books',
                    'v1',
                    developerKey="AIzaSyAjK1oUwCpi5DZcDiiIh2gD348VZASWy1g",
                    )
    request = service.volumes().list(q=query)
    response = request.execute()
    book_list = [response['items'][item]['volumeInfo']
                 for item in range(len(response['items']))]

    return book_list[0]


query = "The Book of the Ancient Greeks"
books = get_books_data(query)
print(books)
