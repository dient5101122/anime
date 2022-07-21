from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.contrib.auth.models import User
from .models import Movie, MovieDescription

from rest_framework.authtoken.models import Token


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user = super().create(validated_data)
        # Token.objects.create(user=user)
        user.is_active = True
        user.set_password(validated_data['password'])
        user.save()
        return user

    # def get_avatar(self, user_object):
    #     request = self.context["request"]
    #     name = user_object.avatar.name
    #     if name.startswith("static/"):
    #         path = '/%s' % name
    #     else:
    #         path = '/static/%s' % name

    #     return request.build_absolute_uri(path)


class MovieSerializer(ModelSerializer):
    image = SerializerMethodField()

    class Meta:
        model = Movie
        fields = "__all__"

    def get_image(self, movie):
        request = self.context["request"]
        name = movie.image.name
        if name.startswith("static/"):
            path = '/%s' % name
        else:
            path = '/static/%s' % name

        return request.build_absolute_uri(path)


class MovieDetailSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"


class MovieDescriptionSerializer(ModelSerializer):
    class Meta:
        model = MovieDescription
        fields = "__all__"
