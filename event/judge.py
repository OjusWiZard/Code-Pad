import base64


class SubmissionData:

    # These 3 should always be bytestrings interally
    source_code = None
    stdin = None
    expected_output = None

    # The language ID
    language_id = None

    # Extra Send Fields
    cpu_time_limit = None
    cpu_extra_time = None
    wall_time_limit = None
    memory_limit = None
    stack_limit = None
    max_processes_and_or_threads = None
    enable_per_process_and_thread_time_limit = None
    enable_per_process_and_thread_memory_limit = None
    max_file_size = None
    number_of_runs = None

    # These 3 should always be bytestrings interally
    compile_output = None
    stdout = None
    stderr = None

    # Receive Fields
    message = None
    exit_code = None
    exit_signal = None
    status = None
    created_at = None
    finished_at = None
    token = None
    time = None
    wall_time = None
    memory = None

    # Please excuse the mess - this simply helps getting the correct fields easier
    _encoded_send_fields = {"source_code", "stdin", "expected_output"}
    _encoded_response_fields = {"stderr", "stdout", "compile_output"}
    _encoded_fields = _encoded_send_fields | _encoded_response_fields
    _extra_send_fields = {"cpu_time_limit", "cpu_extra_time", "wall_time_limit", "memory_limit", "stack_limit", "max_processes_and_or_threads", "enable_per_process_and_thread_time_limit", "enable_per_process_and_thread_memory_limit", "max_file_size", "number_of_runs"}
    _extra_response_fields = {"time", "memory", "token", "message", "status", "exit_code", "exit_signal", "created_at", "finished_at", "wall_time"}
    _response_fields = _encoded_response_fields | _extra_response_fields | {"language_id"}
    _send_fields = _encoded_send_fields | _extra_send_fields
    _fields = _response_fields | _send_fields

    def keys(self):
        """
        Returns a list of all fields used by Judge0
        :return:
        """
        return list(self._fields)

    def __getitem__(self, item):
        """
        Gets an Item by key - decodes the field if encoded
        :param item:
        :return:
        """
        if item in self._encoded_fields:
            # If this does not work, then at some point the data has not been set as bytes internally
            item = getattr(self, item)
            if item:
                return item.decode()
            return None

        return getattr(self, item)

    def load(self, client):
        """
        Populates the object if it has a token
        :param client: the Judge0API client
        """
        headers = {"Content-Type": "application/json"}
        params = {
            "base64_encoded": "true",
            # The fields parameter of judge0 expects a comma separated string rather than a HTML spec param list
            "fields": ",".join(self._response_fields)
        }
        r = client.session.get(f"{client.endpoint}/submissions/{self.token}/", headers=headers, params=params)
        r.raise_for_status()

        json = r.json()
        self.set_properties(dict(json))

    def set_properties(self, r):
        """
        Takes a dict, and sets each value of the dict into Submission, base64 encoding it if required
        :param r:
        :return:
        """
        for key, value in r.items():
            setattr(self, key, value)


class BatchSubmission:

    submissions_data = [] 

    def __init__(self, dataset:list):
        for data in dataset:
            submission = SubmissionData()
            submission.set_properties(data)
            self.submissions_data.append(submission)

    def submit(self, client):
        """
        Submits this Submission. Requires that self.language_id, and self.source_code is not none
        In addition, self.stdin and self.expected output can be set, in order to validate the result on Judge0
        :param client: the Judge0API Client
        :raises HTTPError if the post request is not able to be completed
        """
        params = {"base64_encoded": "true", "wait": str(client.wait).lower()}
        dataset = {
            "submissions": []
        }

        for submission in self.submissions_data:
            data = {}

            data['source_code'] = base64.b64encode(submission.source_code.encode('ascii')).decode('ascii')
            data['language_id'] = submission.language_id

            if submission.stdin:
                data.update({"stdin": base64.b64encode(submission.stdin.encode('ascii')).decode('ascii')})
            if submission.expected_output:
                data.update({"expected_output": base64.b64encode(submission.expected_output.encode('ascii')).decode('ascii')})

            for field in submission._extra_send_fields:
                if submission.__getattribute__(field) is not None:
                    data.update({field: submission.__getattribute__(field)})
            
            dataset["submissions"].append(data)

        r = client.session.post(f"{client.endpoint}/submissions/batch/", params=params, data=dataset)
        r.raise_for_status()

        for submission in self.submissions_data:
            json = r.json()
            submission.set_properties(dict(json))
        
        return self.submissions_data


class Submission:

    submission_data = SubmissionData()

    def __init__(self, **kwargs):
        self.submission_data.set_properties(kwargs)

    def submit(self, client):
        """
        Submits this Submission. Requires that self.language_id, and self.source_code is not none
        In addition, self.stdin and self.expected output can be set, in order to validate the result on Judge0
        :param client: the Judge0API Client
        :raises HTTPError if the post request is not able to be completed
        """
        params = {"base64_encoded": "true", "wait": str(client.wait).lower()}

        data = {}

        data['source_code'] = base64.b64encode(self.submission_data.source_code.encode('ascii')).decode('ascii')
        data['language_id'] = self.submission_data.language_id

        if self.submission_data.stdin:
            data.update({"stdin": base64.b64encode(self.submission_data.stdin.encode('ascii')).decode('ascii')})
        if self.submission_data.expected_output:
            data.update({"expected_output": base64.b64encode(self.submission_data.expected_output.encode('ascii')).decode('ascii')})

        for field in self.submission_data._extra_send_fields:
            if self.submission_data.__getattribute__(field) is not None:
                data.update({field: self.submission_data.__getattribute__(field)})

        r = client.session.post(f"{client.endpoint}/submissions/", params=params, data=data)
        r.raise_for_status()

        json = r.json()
        self.submission_data.set_properties(dict(json))
        
        return self.submission_data
