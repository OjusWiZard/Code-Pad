from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from .judge import submission, get_submission_details, submit_code


class Submit_Code(ViewSet):

    def create(self, request):
        test_input = test_output = program = language = ''
        program = request.POST.get('program')
        language = request.POST.get('language_id')
        if request.POST.get('test_input'):
            test_input = request.POST.get('test_input')
        if request.POST.get('test_output'):
            test_output = request.POST.get('test_output')

        result, status_code = submit_code(program=program, language_id=language, test_in=test_input, test_out=test_output)

        response = Response(data=result, status=status_code)
        return response
