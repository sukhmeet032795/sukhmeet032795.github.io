from django.contrib import auth
from django.shortcuts import render,redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.conf import settings
from django.utils import timezone
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
import json
import re

from contactForm import models as contact

EMAIL_REGEX = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
NAME_REGEX = re.compile(r"^[^\W0-9_]+([ \-'‧][^\W0-9_]+)*?$", re.U)

def validName(name):

	if not name or not NAME_REGEX.match(name):
		return False
	return True

def validEmail(email):

	if not email or not EMAIL_REGEX.match(email):
		return False
	return True	

def validMessage(message):

	if not message:
		return False
	return True

@csrf_exempt
def home(request):

	if request.method == "GET":
		
		form = { "name" : "", "email" : "", "message" : "" }
		return render(request, 'index.html', { 'form': form })

	if request.method == "POST":
		
		name = request.POST["name"]
		email = request.POST["email"]
		message = request.POST["message"]
		
		form = { 'name' : name, 'email' : email, 'message' : message, 'name_error' : False, 'email_error' : False, 'message_error' : False }

		error = False

		if not validName(name):
			form['name_error'] = True
			error = True

		if not validEmail(email):
			form['email_error'] = True 
			error = True

		if not validMessage(message):
			form['message_error'] = True
			error = True

		if error:
			form['status'] = 0
			return HttpResponse( json.dumps(form), content_type='application/json' ) 

		try:
			obj = contact.contactDetails(name = name, email = email, message = message)
			obj.save()
			return HttpResponse( json.dumps({ "status" : 1 }), content_type='application/json' )
		except:
			return HttpResponse( json.dumps({ "status" : 2 }), content_type='application/json' )






