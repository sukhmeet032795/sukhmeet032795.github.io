from django import forms
from contactForm.models import *

class contactDetailsForm(forms.Form):
    
	model = contactDetails
	fields = ('name', 'email', 'message')