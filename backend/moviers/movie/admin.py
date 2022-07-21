from django.contrib import admin
from .models import Movie, MovieItem, MovieComment, MovieDescription, MovieRating

# Register your models here.

admin.site.register(Movie)
admin.site.register(MovieItem)
admin.site.register(MovieComment)
admin.site.register(MovieDescription)
admin.site.register(MovieRating)
