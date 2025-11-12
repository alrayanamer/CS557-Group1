from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, AuthorViewSet, BookViewSet, LoanViewSet

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('authors', AuthorViewSet)
router.register('books', BookViewSet)
router.register('loans', LoanViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]