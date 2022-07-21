from pydoc import describe
from django.db import models
from django.contrib.auth.models import AbstractUser, User

# Create your models here.


# class User(AbstractUser):
#     pass
#     # avatar = models.ImageField(upload_to='image/user/%Y/%m', null=True)

#     def __str__(self):
#         return self.username


class MyModelBase(models.Model):
    pass
    # created_date = models.DateTimeField(auto_now_add=True)
    # updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Movie(MyModelBase):
    # class Meta:
    #     ordering = ["-id"]

    name = models.CharField(max_length=255, null=False, unique=True)
    genre = models.CharField(max_length=255)
    type = models.CharField(max_length=50)
    episodes = models.IntegerField(null=False)
    image = models.ImageField(upload_to='image/movies/%Y/%m', null=True)
    rating = models.IntegerField(default=0)
    members = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    anime_id = models.IntegerField(default=0)

    def __str__(self):
        return '%s' % (self.name)
        # return '%s %s %s %s %s %s %s %s' % (self.name, self.genre, self.type, self.episodes, self.image, self.rating, self.members, self.active)


class MovieItem(MyModelBase):
    name = models.CharField(max_length=255, null=False)
    image = models.ImageField(
        upload_to='image/movie-item/%Y/%m', null=True)
    dir_video = models.CharField(max_length=255)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    def __str__(self):
        return '%s' % (self.name)


class MovieComment(MyModelBase):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    def __str__(self):
        return '%s' % (self.user)


class MovieDescription(models.Model):
    description = models.TextField()
    director = models.CharField(max_length=255, null=True)
    actors = models.CharField(max_length=255, null=True)
    movie = models.OneToOneField(Movie, on_delete=models.CASCADE)
    # images = models.ImageField(
    #     upload_to='image/movie-description/%Y/%m', null=True)

    def __str__(self):
        return '%s' % (self.movie)


class MovieRating(models.Model):
    rating = models.IntegerField()
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    def __str__(self):
        return '%s %s' % (self.user, self.movie)
