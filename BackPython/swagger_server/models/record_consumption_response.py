# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class RecordConsumptionResponse(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, code: int=None, message: str=None):  # noqa: E501
        """RecordConsumptionResponse - a model defined in Swagger

        :param code: The code of this RecordConsumptionResponse.  # noqa: E501
        :type code: int
        :param message: The message of this RecordConsumptionResponse.  # noqa: E501
        :type message: str
        """
        self.swagger_types = {
            'code': int,
            'message': str
        }

        self.attribute_map = {
            'code': 'code',
            'message': 'message'
        }
        self._code = code
        self._message = message

    @classmethod
    def from_dict(cls, dikt) -> 'RecordConsumptionResponse':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The RecordConsumptionResponse of this RecordConsumptionResponse.  # noqa: E501
        :rtype: RecordConsumptionResponse
        """
        return util.deserialize_model(dikt, cls)

    @property
    def code(self) -> int:
        """Gets the code of this RecordConsumptionResponse.


        :return: The code of this RecordConsumptionResponse.
        :rtype: int
        """
        return self._code

    @code.setter
    def code(self, code: int):
        """Sets the code of this RecordConsumptionResponse.


        :param code: The code of this RecordConsumptionResponse.
        :type code: int
        """

        self._code = code

    @property
    def message(self) -> str:
        """Gets the message of this RecordConsumptionResponse.


        :return: The message of this RecordConsumptionResponse.
        :rtype: str
        """
        return self._message

    @message.setter
    def message(self, message: str):
        """Sets the message of this RecordConsumptionResponse.


        :param message: The message of this RecordConsumptionResponse.
        :type message: str
        """

        self._message = message
