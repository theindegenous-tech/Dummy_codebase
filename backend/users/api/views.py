from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from users.models import Bookmark, Personalisation, User
from users.api.serializers import BookmarkSerializer, UserSerializer, PersonalisationSerializer
import jwt, datetime

# Login a user.
@api_view(['POST','OPTION'])
def login_user(request):
    email = request.data['email']
    password = request.data['password']
    user = User.objects.filter(email=email).first()
    if user is None:
        raise AuthenticationFailed('User not found!')

    if not user.check_password(password):
        raise AuthenticationFailed('Incorrect password!')

    serializer = UserSerializer(user)
    payload = {
        'id': user.id,
        'exp': datetime.datetime.now() + datetime.timedelta(days=1),
        'iat':datetime.datetime.now()
    }

    token = jwt.encode(payload, 'secret', algorithm='HS256')
    response = Response()
    response.set_cookie(key='jwt', value=token, samesite=None, httponly=True)
    response.data=serializer.data
    return response

#Signup a user.
@api_view(['POST'])
def signup_user(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)

# Retrieve info about whether a user is logged in or not.
@api_view(['GET'])
def userView(request):
    token = request.COOKIES.get('jwt')

    if not token:
        raise AuthenticationFailed('User not logged in!')

    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('User not logged in!')

    user = User.objects.filter(id=payload['id']).first()
    serializer = UserSerializer(user)
    response = Response()
    response.status=200
    response.data=serializer.data
    return response

# Logout a user.
@api_view(['POST'])
def logout_user(request):
    response = Response()
    response.delete_cookie('jwt')
    response.data={
        'message':'success'
    }
    return response


#Retrieve, update or delete a personalisation setting.
@api_view(['GET', 'PUT'])
def personalisation_detail(request, pk):
    try:
        personalisation_setting = Personalisation.objects.get(pk=pk)
    except Personalisation.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        serializer = PersonalisationSerializer(personalisation_setting)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PersonalisationSerializer(personalisation_setting, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

@api_view(['GET','DELETE'])
def bookmarks_detail(request,pk):
    try:
        bookmark_setting = Bookmark.objects.get(pk=pk)
    except Personalisation.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        serializer = BookmarkSerializer(bookmark_setting)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = BookmarkSerializer(bookmark_setting, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        bookmark_setting.delete()
        return Response(status=204)

@api_view(['GET','POST'])
def bookmarks_list(request):
    if request.method == 'GET':
        bookmarks = Bookmark.objects.all()
        serializer = BookmarkSerializer(bookmarks, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BookmarkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
