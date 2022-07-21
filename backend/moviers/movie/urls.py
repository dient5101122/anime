from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register("users", views.UserViewSet, "user")
router.register("movies", views.MovieViewSet, "movie")
router.register("movie-des", views.MovieDescriptionViewSet, "movie-des")


urlpatterns = [
    path('', include(router.urls)),
    path('movies/<str:pk>', views.get_movie_detail, name='movie-detail'),
    path('cf-algorithm/<str:pk>', views.cf_algorithm, name='cf-algorithm'),
    path('get-anime/<str:pk>', views.fetch_data_anime, name='get-anime'),

]
