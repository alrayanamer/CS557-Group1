from django.urls import path, include
from rest_framework.routers import routers
from .views import UserViewSet, AuthorViewSet, BookViewSet, LoanViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('authors', AuthorViewSet)
router.register('books', BookViewSet)
router.register('loans', LoanViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]