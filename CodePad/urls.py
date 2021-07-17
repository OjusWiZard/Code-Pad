"""CodePad URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="CodePad API",
        description="Codepad is an online quiz platform that enpowers programmers to solve coding problems in real-time with an online code editor and compilers for popular languages.",
        default_version="v1",
        contact=openapi.Contact(email="support@codepad.tech"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("account.urls")),
    path("", include("event.urls")),
    path(
        "docs/swagger<str:format>",
        schema_view.without_ui(),
        name="schema-json",
    ),
    path(
        "docs/swagger/",
        schema_view.with_ui("swagger"),
        name="schema-swagger-ui",
    ),
    path(
        "docs/redoc/",
        schema_view.with_ui("redoc"),
        name="schema-redoc",
    ),
] + static(
    settings.MEDIA_URL + "event_icons",
    document_root=settings.MEDIA_ROOT + "/event_icons",
)
