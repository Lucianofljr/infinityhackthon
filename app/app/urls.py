from django.contrib import admin
from django.urls import path, include
from backend.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Autenticação JWT
    path('api/token/', TokenObtainPairView.as_view(), name="get_token"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="reflesh"),

    #Registro de novo usuário
    path('api/user/register/', CreateUserView.as_view(), name="register"),

    # API REST principal (Notes, tasks)
    path("api/", include("backend.urls")),

    # Interface de login do DRF
    path('api-auth/', include("rest_framework.urls")),
]
