from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from .validators import validate_admission_number


class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    email           = models.EmailField(_('email address'), unique=True)
    is_staff        = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)
    date_joined     = models.DateTimeField(default=timezone.now)

    username        = models.SlugField(max_length=16, unique=True)
    admission_no    = models.CharField(max_length=8, unique=True, validators=[validate_admission_number])
    first_name      = models.CharField(max_length=16)
    last_name       = models.CharField(max_length=16)
    avatar          = models.SmallIntegerField()

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['username', 'admission_no', 'first_name', 'last_name', 'avatar']

    objects         = UserManager()

    def __str__(self):
        return self.username
