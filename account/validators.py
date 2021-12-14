import re

from django.core.exceptions import ValidationError


def validate_admission_number(number):
    match = re.match(
        pattern="([0-2][0-9])([a-z]|[A-Z]|&){1,}([0-9]{3})", string=number
    )
    error_message = "Enter a valid admission number."
    if match is None:
        raise ValidationError(error_message)


def validate_contact_number(number):
    match = re.match(pattern="^[6-9]\d{9}$", string=number)
    error_message = "Enter a valid Contact number."
    if match is None:
        raise ValidationError(error_message)
