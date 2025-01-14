# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.consumption_graph_response_data import ConsumptionGraphResponseData  # noqa: F401,E501
from swagger_server import util


class ConsumptionGraphResponse(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, code: int=None, message: str=None, data: ConsumptionGraphResponseData=None):  # noqa: E501
        """ConsumptionGraphResponse - a model defined in Swagger

        :param code: The code of this ConsumptionGraphResponse.  # noqa: E501
        :type code: int
        :param message: The message of this ConsumptionGraphResponse.  # noqa: E501
        :type message: str
        :param data: The data of this ConsumptionGraphResponse.  # noqa: E501
        :type data: ConsumptionGraphResponseData
        """
        self.swagger_types = {
            'code': int,
            'message': str,
            'data': ConsumptionGraphResponseData
        }

        self.attribute_map = {
            'code': 'code',
            'message': 'message',
            'data': 'data'
        }
        self._code = code
        self._message = message
        self._data = data

    @classmethod
    def from_dict(cls, dikt) -> 'ConsumptionGraphResponse':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The ConsumptionGraphResponse of this ConsumptionGraphResponse.  # noqa: E501
        :rtype: ConsumptionGraphResponse
        """
        return util.deserialize_model(dikt, cls)

    @property
    def code(self) -> int:
        """Gets the code of this ConsumptionGraphResponse.


        :return: The code of this ConsumptionGraphResponse.
        :rtype: int
        """
        return self._code

    @code.setter
    def code(self, code: int):
        """Sets the code of this ConsumptionGraphResponse.


        :param code: The code of this ConsumptionGraphResponse.
        :type code: int
        """

        self._code = code

    @property
    def message(self) -> str:
        """Gets the message of this ConsumptionGraphResponse.


        :return: The message of this ConsumptionGraphResponse.
        :rtype: str
        """
        return self._message

    @message.setter
    def message(self, message: str):
        """Sets the message of this ConsumptionGraphResponse.


        :param message: The message of this ConsumptionGraphResponse.
        :type message: str
        """

        self._message = message

    @property
    def data(self) -> ConsumptionGraphResponseData:
        """Gets the data of this ConsumptionGraphResponse.


        :return: The data of this ConsumptionGraphResponse.
        :rtype: ConsumptionGraphResponseData
        """
        return self._data

    @data.setter
    def data(self, data: ConsumptionGraphResponseData):
        """Sets the data of this ConsumptionGraphResponse.


        :param data: The data of this ConsumptionGraphResponse.
        :type data: ConsumptionGraphResponseData
        """

        self._data = data
