from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (NoteListCreate, NoteDelete, CreateUserView, TaskViewSet)

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='tasks')

urlpatterns = [
    path('', include(router.urls)),
    path('notes/', NoteListCreate.as_view(), name='note-list-create'),
    path('notes/<int:pk>/', NoteDelete.as_view(), name='note-delete'),
]
