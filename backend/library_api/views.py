from rest_framework import viewsets, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from .models import LibraryUser, Author, Book, Loan
from .serializers import LibraryUserSerializer, AuthorSerializer, BookSerializer, LoanSerializer

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    try:
        user = LibraryUser.objects.get(email=email, password=password)
        serializer = LibraryUserSerializer(user)
        return Response(serializer.data)
    except LibraryUser.DoesNotExist:
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def register_view(request):
    serializer = LibraryUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(role='member') 
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    queryset = LibraryUser.objects.all()
    serializer_class = LibraryUserSerializer
    authentication_classes = [] 
    permission_classes = []

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    authentication_classes = []
    permission_classes = []

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = []
    permission_classes = []

class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    authentication_classes = []
    permission_classes = []