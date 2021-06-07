from django.core.exceptions import ValidationError
import re

def validate_admission_number(number):
    match = re.match(pattern='([0-2][0-9])(CS|IT|EE|ECE|EEE|CE|IC|ME|MT)([0-9]{3})', string=number)
    error_message = 'Enter a valid value. Make sure that all the alphabets are capital.'
    if match is None:
        raise ValidationError(error_message)
    elif match.span()[1] < len(number):
        raise ValidationError(error_message)

def validate_contact_number(number):
    match = re.match(pattern='^[6-9]\d{9}$', string=number)
    error_message = "Enter a valid Contact number."
    if match is None:
        raise ValidationError(error_message)
        