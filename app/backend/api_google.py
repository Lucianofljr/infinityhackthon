# import datetime
# from django.conf import settings
# from django.shortcuts import redirect
# from httplib2 import Credentials
# from rest_framework.views import APIView


# from google_auth_oauthlib.flow import Flow
# from googleapiclient.discovery import build
# from google.auth.transport.requests import Request



# # Abaixo todos os endpoints do google calendar
# def get_google_credentials(user):
#     try:
#         token_obj = GoogleCalendarToken.objects.get(user=user)
#         credentials = Credentials(
#             token=token_obj.access_token,
#             refresh_token=token_obj.refresh_token,
#             token_uri=token_obj.token_uri,
#             client_id=token_obj.client_id,
#             client_secret=token_obj.client_secret,
#             scopes=token_obj.scopes.split(',')
#         )

#         # Atualiza o token se ele estiver expirado
#         if credentials.expired and credentials.refresh_token:
#             credentials.refresh(Request())
#             token_obj.access_token = credentials.token
#             token_obj.expires_in = credentials.expires_in
#             token_obj.last_refreshed = datetime.datetime.now()
#             token_obj.save()
#         return credentials
#     except GoogleCalendarToken.DoesNotExist:
#         return None

# class GoogleCalendarInitView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         flow = Flow.from_client_secrets_file(
#             'client_secret.json', # Você precisará baixar este arquivo do Google Cloud Console
#             scopes=settings.GOOGLE_SCOPES,
#             redirect_uri=settings.GOOGLE_REDIRECT_URI
#         )
#         # Se você não quiser um arquivo, pode passar as credenciais diretamente:
#         # flow = Flow.from_details(
#         #     client_id=settings.GOOGLE_CLIENT_ID,
#         #     client_secret=settings.GOOGLE_CLIENT_SECRET,
#         #     scopes=settings.GOOGLE_SCOPES,
#         #     redirect_uri=settings.GOOGLE_REDIRECT_URI
#         # )

#         authorization_url, state = flow.authorization_url(
#             access_type='offline', # Necessário para obter um refresh_token
#             include_granted_scopes='true'
#         )
#         request.session['oauth_state'] = state # Armazena o estado para validação
#         return redirect(authorization_url)

# class GoogleCalendarCallbackView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         state = request.GET.get('state')
#         if state != request.session.get('oauth_state'):
#             return Response({"error": "State mismatch"}, status=status.HTTP_400_BAD_REQUEST)

#         flow = Flow.from_client_secrets_file(
#             'client_secret.json', # Ou use from_details como acima
#             scopes=settings.GOOGLE_SCOPES,
#             redirect_uri=settings.GOOGLE_REDIRECT_URI
#         )
#         flow.fetch_token(authorization_response=request.build_absolute_uri())

#         credentials = flow.credentials
        
#         # Salvar os tokens no banco de dados
#         GoogleCalendarToken.objects.update_or_create(
#             user=request.user,
#             defaults={
#                 'access_token': credentials.token,
#                 'refresh_token': credentials.refresh_token,
#                 'expires_in': credentials.expires_in,
#                 'token_uri': credentials.token_uri,
#                 'client_id': credentials.client_id,
#                 'client_secret': credentials.client_secret,
#                 'scopes': ','.join(credentials.scopes),
#             }
#         )
#         return Response({"message": "Google Calendar connected successfully!"}, status=status.HTTP_200_OK)
#         # Em um aplicativo real, você redirecionaria o usuário de volta para o frontend
#         # return redirect('http://localhost:5173/profile') # Exemplo de redirecionamento para o frontend

# class GoogleCalendarEventsView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         credentials = get_google_credentials(request.user)
#         if not credentials:
#             return Response({"error": "Google Calendar not connected. Please authorize first."}, status=status.HTTP_401_UNAUTHORIZED)

#         try:
#             service = build('calendar', 'v3', credentials=credentials)
#             now = datetime.datetime.utcnow().isoformat() + 'Z' # 'Z' indica UTC time
#             events_result = service.events().list(
#                 calendarId='primary',
#                 timeMin=now,
#                 maxResults=10,
#                 singleEvents=True,
#                 orderBy='startTime'
#             ).execute()
#             events = events_result.get('items', [])
#             return Response(events, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     def post(self, request):
#         credentials = get_google_credentials(request.user)
#         if not credentials:
#             return Response({"error": "Google Calendar not connected. Please authorize first."}, status=status.HTTP_401_UNAUTHORIZED)

#         event_data = request.data
#         if not event_data.get('summary') or not event_data.get('start') or not event_data.get('end'):
#             return Response({"error": "Summary, start, and end are required for event creation."}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             service = build('calendar', 'v3', credentials=credentials)
#             event = service.events().insert(calendarId='primary', body=event_data).execute()
#             return Response(event, status=status.HTTP_201_CREATED)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # Exemplo de como você pode criar um evento a partir de uma Task (apenas um esboço)
# # Você precisaria ajustar isso para a sua lógica de negócio
# class SyncTaskToGoogleCalendar(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    # def post(self, request, task_id):
    #     credentials = get_google_credentials(request.user)
    #     if not credentials:
    #         return Response({"error": "Google Calendar not connected."}, status=status.HTTP_401_UNAUTHORIZED)

    #     try:
    #         task = Task.objects.get(id=task_id, user=request.user)
    #         service = build('calendar', 'v3', credentials=credentials)

    #         event = {
    #             'summary': task.title,
    #             'description': f'Categoria: {task.get_category_display()}',
    #             'start': {
    #                 'date': task.date.isoformat(),
    #                 'timeZone': 'America/Sao_Paulo', # Ajuste para o fuso horário da sua escola
    #             },
    #             'end': {
    #                 'date': task.date.isoformat(),
    #                 'timeZone': 'America/Sao_Paulo',
    #             },
    #             # Adicione mais campos do evento se necessário, como 'location', 'attendees'
    #         }

    #         created_event = service.events().insert(calendarId='primary', body=event).execute()
    #         # Opcional: Salvar o ID do evento do Google Calendar na sua Task para futuras atualizações
    #         # task.google_calendar_event_id = created_event['id']
    #         # task.save()
    #         return Response(created_event, status=status.HTTP_201_CREATED)
    #     except Task.DoesNotExist:
    #         return Response({"error": "Task not found."}, status=status.HTTP_404_NOT_FOUND)
    #     except Exception as e:
    #         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)