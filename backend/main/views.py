from django.shortcuts import render
from django.http import HttpResponse, HttpRequest


def home(request: HttpRequest, *args, **kwargs) -> HttpResponse:
    my_context = {
        "Title": "Welcome to Aquavillas",
    }

    return render(request, "main/home.html", my_context)
