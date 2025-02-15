from django.db import models

# Create your models here.
class Items(models.Model):
    id=models.AutoField(primary_key=True)
    created_at=models.DateTimeField(auto_now_add=True)
    name=models.CharField(max_length=100)
    Description=models.TextField()
    # BusinessId=models.ForeignKey(Business,on_delete=models.CASCADE)
    # Cartegory=models.ForeignKey(Cartegory,on_delete=models.CASCADE)
    NoOfItems=models.IntegerField(default=0)
    Price=models.FloatField()
    image=models.ImageField(upload_to='items/',null=True,blank=True)


    def __str__(self):
        return self.name
    
    def get_id(self):

        self.id = UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        return self.id