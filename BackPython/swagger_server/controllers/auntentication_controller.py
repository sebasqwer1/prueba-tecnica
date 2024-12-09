import connexion
from swagger_server.services.consumption_service import ConsumptionService



def login(body=None):  # noqa: E501
    """Inicio de sesión

    Inicio de sesión # noqa: E501

    :param body: Datos de entrada
    :type body: dict | bytes

    :rtype: LoginResponse
    """
    if connexion.request.is_json:
        consumption_service = ConsumptionService()

        return consumption_service.login(body)
