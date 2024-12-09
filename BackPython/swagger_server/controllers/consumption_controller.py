import connexion
from swagger_server.services.consumption_service import ConsumptionService



def deposit_balance(body=None):  # noqa: E501
    """Deopistar dinero para actualización de saldo

    Deopistar dinero para actualización de saldo # noqa: E501

    :param body: Ingreso de saldo
    :type body: dict | bytes

    :rtype: RecordConsumptionResponse
    """
    if connexion.request.is_json:
        deposit_balance
        consumption_service = ConsumptionService()

        return consumption_service.deposit_balance(body)


def get_transactions(client_id):  # noqa: E501
    """Obtener transacciones realizadas

    Obtener transacciones realizadas # noqa: E501

    :param client_id: Ingrese el id del cliente
    :type client_id: float

    :rtype: TransactionsResponse
    """

    consumption_service = ConsumptionService()
    get_transactions
    return consumption_service.get_transactions(client_id)


def get_data_consumption_graph(client_id):  # noqa: E501
    """Obtener datos para graficar consumos de datos vs recargas por mes

    Obtener datos para graficar consumos de datos vs recargas por mes # noqa: E501

    :param client_id: Ingrese el id del cliente
    :type client_id: float

    :rtype: ConsumptionGraphResponse
    """
    consumption_service = ConsumptionService()
    return consumption_service.comparison_recharge_and_consumption(client_id)


def get_record_consumption(client_id):  # noqa: E501
    """Obtener consumos registrados por cliente

    Obtener consumos registrados por cliente # noqa: E501

    :param client_id: Ingrese el id del cliente
    :type client_id: int

    :rtype: ConsumptionResponse
    """
    consumption_service = ConsumptionService()

    return consumption_service.get_consumption(client_id)


def record_consumption(body=None):
    """Registrar consumo de datos por cliente

    Registrar consumo de datos por cliente

    :param body: Datos de entrada
    :type body: dict | bytes

    :rtype: RecordConsumptionResponse
    """
    if connexion.request.is_json:

        consumption_service = ConsumptionService()

        return consumption_service.record_consumption(body)

def recharge_balance(body=None):
    """Recargar saldo por cliente

    Recargar saldo por cliente

    :param body: Datos de entrada
    :type body: dict | bytes

    :rtype: RecordConsumptionResponse
    """
    if connexion.request.is_json:

        consumption_service = ConsumptionService()

        return consumption_service.recharge_balance(body)
