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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content[:30] + '...'