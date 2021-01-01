import os
import requests
import json

judge = {
    'key': os.environ['JUDGE_KEY'],
    'host': os.environ['JUDGE_HOST']
}


def submission(program, language, test_input=None, test_output=None):

    submit_url = judge['host'] + "submissions/"

    payload = {
        'source_code': str(program),
        'language_id': str(language),
        'cpu_time_limit': '1',
        'cpu_extra_time': '0.01',
        # 'memory_limit': '1572864',
        'stack_limit': '8192',
        # 'max_file_size': '50000'
    }
    if test_input:
        payload['stdin'] = str(test_input)
    if test_output:
        payload['expected_output'] = str(test_output)

    headers = {
        'Content-Type': 'application/json',
        'x-rapidapi-key': judge['key'],
    }

    response = requests.request("POST", submit_url, headers=headers, data=json.dumps(payload))

    print( str(response) + ' ' + response.text)
    return response


def get_submission_details(token):

    submit_url = judge['host'] + "submissions/" + token
    headers = {'x-rapidapi-key': judge['key']}
    response = requests.request("GET", submit_url, headers=headers)
    
    print( str(response) + ' ' + response.text)
    return response
