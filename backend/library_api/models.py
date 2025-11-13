from django.db import models

class Author(models.Model):
    author_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=45, null=True)
    last_name = models.CharField(max_length=45, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Book(models.Model):
    book_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=45, null=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    status = models.CharField(max_length=45, null=True)

    def __str__(self):
        return self.title


class LibraryUser(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=45, null=True)
    last_name = models.CharField(max_length=45, null=True)
    email = models.CharField(max_length=45, null=True)
    password = models.CharField(max_length=45, null=True)

    def __str__(self):
        return self.first_name


class Loan(models.Model):
    loan_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(LibraryUser, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrow_date = models.CharField(max_length=45, null=True)
    return_date = models.CharField(max_length=45, null=True)

    def __str__(self):
        return f"Loan #{self.loan_id}"
