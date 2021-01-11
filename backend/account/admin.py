from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):  
    exclude = ['password']
    list_display = ['username','admission_no','email','first_name','last_name']
    ordering = ['admission_no']
    search_fields = ['username','email','admission_no']

admin.site.register(User, UserAdmin)