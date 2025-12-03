from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, AuthorViewSet, BookViewSet, LoanViewSet, login_view, register_view

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('authors', AuthorViewSet)
router.register('books', BookViewSet)
router.register('loans', LoanViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/login/', login_view, name='login'),
    path('api/register/', register_view, name='register'),
]