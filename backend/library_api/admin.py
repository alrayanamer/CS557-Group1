from django.contrib import admin
from .models import Author, Book, LibraryUser, Loan

# Register your models here.
admin.site.register(Author)
admin.site.register(Book)
admin.site.register(LibraryUser)
admin.site.register(Loan)
