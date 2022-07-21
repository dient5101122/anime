from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.filters import OrderingFilter, SearchFilter

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view

from django.contrib.auth.models import User
from .serializers import MovieSerializer, UserSerializer, ModelSerializer, MovieDescriptionSerializer, MovieDetailSerializer
from .models import Movie, MovieDescription
from .paginations import CustomPagination

from .algorithm_rs import top_animes, process_data_animes, get_data_anime

# Create your views here.


class UserViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # authentication_classes = [TokenAuthentication, ]
    # permission_classes = [permissions.IsAuthenticated, ]

    # def get_queryset(self):
    #     user = User.objects.all()
    #     return user


class MovieViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    pagination_class = CustomPagination
    filter_backends = [OrderingFilter, SearchFilter]
    search_fields = ['=anime_id', 'name']
    # authentication_classes = [TokenAuthentication, ]
    # permission_classes = [permissions.IsAuthenticated, ]


@api_view(['GET'])
def get_movie_detail(request, pk):
    movie = Movie.objects.get(id=pk)
    serializer = MovieDetailSerializer(movie, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


class MovieDescriptionViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView):
    queryset = MovieDescription.objects.all()
    serializer_class = MovieDescriptionSerializer
    pagination_class = CustomPagination
    filter_backends = [OrderingFilter, SearchFilter]
    # authentication_classes = [TokenAuthentication, ]
    # permission_classes = [permissions.IsAuthenticated, ]


# ---------------------------------------------------------------------------------

@api_view(['GET'])
def cf_algorithm(request, pk):
    result = process_data_animes(pk)

    res = {'data': result}
    return Response(res, status=status.HTTP_200_OK)


@api_view(['GET'])
def fetch_data_anime(request, pk):
    result = get_data_anime(pk)

    res = {'data': result}
    return Response(res, status=status.HTTP_200_OK)
