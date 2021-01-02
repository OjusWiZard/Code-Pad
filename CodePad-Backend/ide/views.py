from django.http import HttpResponse
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import AllowAny
from .judge import submission, get_submission_details
from time import sleep
from json import dumps


class Submit_Code(ViewSet):

    def create(self, request):
        test_in = test_out = program = language = ''
        program = request.POST.get('program')
        language = request.POST.get('language_id')
        if request.POST.get('test_input'):
            test_in = request.POST.get('test_input')
        if request.POST.get('test_output'):
            test_out = request.POST.get('test_output')
        
        response = submission(program, language, test_in, test_out)

        if response.status_code != 201:
            view_response = HttpResponse(
                response.text,
                content_type=request.headers['Content-Type'],
                status=response.status_code,
                reason=response.reason,
                charset=request.encoding
            )
            return view_response
        else:
            submission_token = response.json()['token']

            retries = 3
            while retries:
                response, encoded_response = get_submission_details(submission_token)
                if response['status']['id'] > 2:
                    break
                else:
                    retries -= 1

            custom_response = {
                "stdout": response['stdout'],
                "time": response['time'],
                "memory": response['memory'],
                "stderr": response['stderr'],
                "token": response['token'],
                "compile_output": response['compile_output'],
                "message": response['message'],
                "status": {
                    "id": response['status']['id'],
                    "description": response['status']['description']
                }
            }

            view_response = HttpResponse(
                dumps(custom_response),
                content_type=encoded_response.headers['Content-Type'],
                status=encoded_response.status_code,
                reason=encoded_response.reason,
                charset=encoded_response.encoding
            )
            return view_response
