import os
import requests
import json
from base64 import b64encode, b64decode

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
