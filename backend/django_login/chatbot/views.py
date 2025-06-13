from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests

class ChatbotAPIView(APIView):
    def post(self, request):
        message = request.data.get('message')

        if not message:
            return Response({'error': 'Aucun message fourni.'}, status=status.HTTP_400_BAD_REQUEST)

        payload = {
            "model": "mistral:latest",
            "messages": [{"role": "user", "content": message}],
            "stream": False  # très important, on désactive le streaming
        }

        try:
            ollama_response = requests.post("http://localhost:11434/api/chat", json=payload)
            ollama_response.raise_for_status()

            data = ollama_response.json()

            # DEBUG ici :
            print("OLLAMA RAW RESPONSE: ", data)

            response_text = data.get('message', {}).get('content', '')
            return Response({"response": response_text}, status=status.HTTP_200_OK)

        except Exception as e:
            print("ERREUR:", str(e))
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
