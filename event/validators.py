import os

from django.core.exceptions import ValidationError
from django.core.validators import (
    FileExtensionValidator,
    get_available_image_extensions,
)


def validate_text_file(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = [".txt"]
    if not ext.lower() in valid_extensions:
        raise ValidationError("Unsupported file extension.")


def validate_image_file(value):
    allowed_extensions = get_available_image_extensions() + ["svg"]
    return FileExtensionValidator(allowed_extensions=allowed_extensions)(value)
