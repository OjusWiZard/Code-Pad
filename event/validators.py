import os
from django.core.exceptions import ValidationError


def validate_text_file(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = [".txt"]
    if not ext.lower() in valid_extensions:
        raise ValidationError("Unsupported file extension.")
