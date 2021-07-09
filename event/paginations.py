from collections import OrderedDict

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class Pagination_Size10(PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return Response(
            OrderedDict(
                [
                    ("count", self.page.paginator.count),
                    ("next", self.get_next_link()),
                    ("current", self.page.number),
                    ("previous", self.get_previous_link()),
                    ("results", data),
                ]
            )
        )
