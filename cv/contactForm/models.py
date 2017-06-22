from django.db import models

# Create your models here.

class contactDetails(models.Model):
	name = models.CharField(max_length = 100)
	email = models.EmailField(max_length = 254)
	message = models.TextField()

	def __str__(self):
		return str(name) + " " + str(email)