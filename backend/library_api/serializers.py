from rest_framework import serializers
from .models import Author, Book, LibraryUser, Loan


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['author_id', 'first_name', 'last_name']


class BookSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(
        queryset=Author.objects.all(),
        source='author',
        write_only=True
    )

    class Meta:
        model = Book
        fields = ['book_id', 'title', 'author', 'author_id', 'status']


class LibraryUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = LibraryUser
        fields = ['user_id', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = LibraryUser.objects.create(**validated_data)
        return user


class LoanSerializer(serializers.ModelSerializer):
    user = LibraryUserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=LibraryUser.objects.all(),
        source='user',
        write_only=True
    )

    book = BookSerializer(read_only=True)
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(),
        source='book',
        write_only=True
    )

    class Meta:
        model = Loan
        fields = [
            'loan_id',
            'user', 'user_id',
            'book', 'book_id',
            'borrow_date', 'return_date'
        ]
