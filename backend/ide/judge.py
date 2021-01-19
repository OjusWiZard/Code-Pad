import os
import requests
import json
from base64 import b64encode, b64decode
from rest_framework.exceptions import ValidationError

judge = {
    'key': os.environ['JUDGE_KEY'],
    'host': os.environ['JUDGE_HOST']
}


def encode(string):
    string_bytes = string.encode('ascii')
    encoded_string_bytes = b64encode(string_bytes)
    encoded_string = encoded_string_bytes.decode('ascii')
    return encoded_string


def decode(base64_string):
    decoded_string_bytes = b64decode(base64_string)
    decoded_string = decoded_string_bytes.decode()
    return decoded_string


def submission(program, language, test_input=None, test_output=None):

    submit_url = 'https://' + judge['host'] + "/submissions/?base64_encoded=true"

    payload = {
        'source_code': encode(str(program)),
        'language_id': str(language),
        'cpu_time_limit': '1',
        'cpu_extra_time': '0.01',
        # 'memory_limit': '1572864',
        'stack_limit': '8192',
        # 'max_file_size': '50000'
    }
    if test_input:
        payload['stdin'] = encode(str(test_input))
    if test_output:
        payload['expected_output'] = encode(str(test_output))

    headers = {
        'Content-Type': 'application/json',
        'x-rapidapi-key': judge['key'],
        'x-rapidapi-host': judge['host']
    }

    response = requests.request("POST", submit_url, headers=headers, data=json.dumps(payload))

    print( str(response) + ' ' + response.text)
    return response


def get_submission_details(token):

    submit_url = 'https://' + judge['host'] + "/submissions/" + token + '?base64_encoded=true'
    headers = {
        'x-rapidapi-key': judge['key'],
        'x-rapidapi-host': judge['host']
        }
    response = requests.request("GET", submit_url, headers=headers)
    
    decoded_response = response.json()
    if decoded_response['stdout']:
        decoded_response['stdout'] = decode(decoded_response['stdout'])
    if decoded_response['stderr']:
        decoded_response['stderr'] = decode(decoded_response['stderr'])
    if decoded_response['compile_output']:
        decoded_response['compile_output'] = decode(decoded_response['compile_output'])
    if decoded_response['message']:
        decoded_response['message'] = decode(decoded_response['message'])

    print( str(response) + ' ' + json.dumps(decoded_response))
    return decoded_response, response


def submit_code(language_id, program, test_in=None, test_out=None):

    response = submission(program, language_id, test_in, test_out)

    if response.status_code != 201:
        what_happened = json.loads(response.content)
        raise ValidationError(what_happened)
    else:
        submission_token = response.json()['token']

        retries = 3
        while retries or test_out:
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

        return custom_response, encoded_response.status_code


supported_languages = {
    45: 'Assembly (NASM 2.14.02)',
    46: 'Bash (5.0.0)',
    47: 'Basic (FBC 1.07.1)',
    75: 'C (Clang 7.0.1)',
    76: 'C++ (Clang 7.0.1)',
    48: 'C (GCC 7.4.0)',
    52: 'C++ (GCC 7.4.0)',
    49: 'C (GCC 8.3.0)',
    53: 'C++ (GCC 8.3.0)',
    50: 'C (GCC 9.2.0)',
    54: 'C++ (GCC 9.2.0)',
    86: 'Clojure (1.10.1)',
    51: 'C# (Mono 6.6.0.161)',
    77: 'COBOL (GnuCOBOL 2.2)',
    55: 'Common Lisp (SBCL 2.0.0)',
    56: 'D (DMD 2.089.1)',
    57: 'Elixir (1.9.4)',
    58: 'Erlang (OTP 22.2)',
    44: 'Executable',
    87: 'F# (.NET Core SDK 3.1.202)',
    59: 'Fortran (GFortran 9.2.0)',
    60: 'Go (1.13.5)',
    88: 'Groovy (3.0.3)',
    61: 'Haskell (GHC 8.8.1)',
    62: 'Java (OpenJDK 13.0.1)',
    63: 'JavaScript (Node.js 12.14.0)',
    78: 'Kotlin (1.3.70)',
    64: 'Lua (5.3.5)',
    89: 'Multi-file program',
    79: 'Objective-C (Clang 7.0.1)',
    65: 'OCaml (4.09.0)',
    66: 'Octave (5.1.0)',
    67: 'Pascal (FPC 3.0.4)',
    85: 'Perl (5.28.1)',
    68: 'PHP (7.4.1)',
    43: 'Plain Text',
    69: 'Prolog (GNU Prolog 1.4.5)',
    70: 'Python (2.7.17)',
    71: 'Python (3.8.1)',
    80: 'R (4.0.0)',
    72: 'Ruby (2.7.0)',
    73: 'Rust (1.40.0)',
    81: 'Scala (2.13.2)',
    82: 'SQL (SQLite 3.27.2)',
    83: 'Swift (5.2.3)',
    74: 'TypeScript (3.7.4)',
    84: 'Visual Basic.Net (vbnc 0.0.0.5943)'
}