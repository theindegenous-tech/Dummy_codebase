from dataclasses import field
from rest_framework import serializers
from users.models import User, Personalisation, Bookmark




class BookmarkSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Bookmark
        fields = ['id', 'book_id', 'bookmark_name', 'personalisation', 'location']

class PersonalisationSerializer(serializers.ModelSerializer):
    bookmarks = BookmarkSerializer(read_only=True, many=True)
    class Meta:
        model = Personalisation
        fields = ['id', 'liked', 'mylibrary','bookmarks']

class UserSerializer(serializers.ModelSerializer):
    personalisation = PersonalisationSerializer(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password','personalisation']
        extra_kwargs={
            'password':{
                'write_only':True
            }
        }

    def create(self, validated_data):
        personlisation = Personalisation.objects.create()
        validated_data['personalisation'] = personlisation
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

