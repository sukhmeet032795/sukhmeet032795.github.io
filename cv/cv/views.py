from django.contrib import auth
from django.shortcuts import render,redirect
from django.http import HttpResponse,Http404
from django.conf import settings
from django.utils import timezone
from django.core import serializers

from contactForm import models
from contactForm import forms

def home(request):

	form_contact = forms.contactDetailsForm

	if request.method == "GET":
		return render(request, 'index.html', {
        	'form': form_contact,
    	})