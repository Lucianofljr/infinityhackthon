from django.contrib.auth.models import User
from django.db import models

class Task(models.Model):
    CATEGORY_CHOICES = [
        ('meeting', 'Reunião'),
        ('delivery', 'Entrega'),
        ('event', 'Evento'),
        ('other', 'Outro'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    date = models.DateField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    is_done = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} ({self.date})"

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content[:30] + '...'
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.URLField(blank=True, null=True) # URL da foto de perfil
    cargo = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.user.username
    
class GoogleCalendarToken(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    access_token = models.CharField(max_length=255)
    refresh_token = models.CharField(max_length=255, null=True, blank=True)
    expires_in = models.IntegerField() # Tempo de expiração em segundos
    token_uri = models.CharField(max_length=255)
    client_id = models.CharField(max_length=255)
    client_secret = models.CharField(max_length=255)
    scopes = models.TextField()
    last_refreshed = models.DateTimeField(auto_now=True) # Para controlar quando o token foi atualizado

    def __str__(self):
        return f"Tokens for {self.user.username}"