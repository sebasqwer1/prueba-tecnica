# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.consumption_response import ConsumptionResponse  # noqa: E501
from swagger_server.models.record_consumption import RecordConsumption  # noqa: E501
from swagger_server.models.record_consumption_response import RecordConsumptionResponse  # noqa: E501
from swagger_server.test import BaseTestCase


class TestConsumptionController(BaseTestCase):
    """ConsumptionController integration test stubs"""

    def test_get_record_consumption(self):
        """Test case for get_record_consumption

        Obtener consumos registrados por cliente
        """
        query_string = [('client_id', 1.2)]
        response = self.client.open(
            '/rest/bss_service/v1.0/get_record_consumption',
            method='GET',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_record_consumption(self):
        """Test case for record_consumption

        Registrar consumo de datos por cliente
        """
        body = RecordConsumption()
        response = self.client.open(
            '/rest/bss_service/v1.0/record_consumption',
            method='POST',
            data=json.dumps(body),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
