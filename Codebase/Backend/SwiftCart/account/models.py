import uuid
from django.db import models

# Create your models here.

class User(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    created_at=models.DateTimeField(auto_now_add=True)
    FirstName=models.CharField(max_length=100)
    LastName=models.CharField(max_length=100)
    Email=models.EmailField(max_length=100, unique=True)
    USERNAME_FIELD = 'Email'
    REQUIRED_FIELDS = ['username']

    Customer = models.BooleanField(default=True)
    password=models.CharField(max_length=100, null=True)
    password2=models.CharField(max_length=100, null=True)


    def __str__(self):
        return self.Email