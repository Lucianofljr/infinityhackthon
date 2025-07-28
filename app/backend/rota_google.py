from django.urls import path
from .views import (GoogleCalendarInitView, GoogleCalendarCallbackView, GoogleCalendarEventsView,
    SyncTaskToGoogleCalendar)

urlpatterns = [
    # rotas do google calendar
    path('google-oauth-init/', GoogleCalendarInitView.as_view(), name='google-oauth-init'),
    path('google-oauth-callback/', GoogleCalendarCallbackView.as_view(), name='google-oauth-callback'),
    path('google-oauth-events/', GoogleCalendarEventsView.as_view(), name='google-oauth-events'),
    path('sync-task-to-google-calendar/<int:task_id>/', SyncTaskToGoogleCalendar.as_view(), name='sync-task-to-google-calendar'),
]
