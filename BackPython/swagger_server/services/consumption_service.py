"""Este módulo se encarga de manejar la lógica de consumo."""
from swagger_server.repositories.consumption_repository import ConsumptionRepository
from swagger_server.config.socketio_instance import socketio

class ConsumptionService():
    """Clase para manejar la lógica de consumo."""

    def __init__(self):
        pass

    @staticmethod
    def login(body):
        """Este método se encarga de realizar el inicio de sesión de los clientes."""

        consumption_repository = ConsumptionRepository()

        return consumption_repository.login(body["username"], body["password"])


    @staticmethod
    def get_consumption(client_id: int):
        """Este método se encarga de obtener el consumo de los clientes."""

        consumption_repository = ConsumptionRepository()

        return consumption_repository.get_consumption(client_id)


    @staticmethod
    def record_consumption(body):
        """Este método se encarga de registrar el consumo de los clientes."""

        consumption_repository = ConsumptionRepository()

        response = consumption_repository.record_consumption(body)

        recharge_balance = consumption_repository.get_consumption(body["client_id"])
        comparison_recharge_and_consumption = consumption_repository.comparison_recharge_and_consumption(body["client_id"])
        get_transactions = consumption_repository.get_transactions(body["client_id"])

        ConsumptionService.emit_event(body["client_id"], recharge_balance, comparison_recharge_and_consumption, get_transactions)

        return response


    @staticmethod
    def recharge_balance(body):
        """Este método se encarga de recargar el saldo de los clientes."""

        consumption_repository = ConsumptionRepository()

        response = consumption_repository.recharge_balance(body)

        recharge_balance = consumption_repository.get_consumption(body["client_id"])
        comparison_recharge_and_consumption = consumption_repository.comparison_recharge_and_consumption(body["client_id"])
        get_transactions = consumption_repository.get_transactions(body["client_id"])

        ConsumptionService.emit_event(body["client_id"], recharge_balance, comparison_recharge_and_consumption, get_transactions)

        return response
    

    @staticmethod
    def comparison_recharge_and_consumption(client_id):
        """Este método se encarga de comparar las recargas y consumos de los clientes."""

        consumption_repository = ConsumptionRepository()

        return consumption_repository.comparison_recharge_and_consumption(client_id)
    

    @staticmethod
    def get_transactions(client_id):
        """Este método se encarga de obtener las transacciones de los clientes."""

        consumption_repository = ConsumptionRepository()

        return consumption_repository.get_transactions(client_id)
    

    @staticmethod
    def deposit_balance(body):
        """Este método se encarga de depositar el saldo de los clientes."""

        consumption_repository = ConsumptionRepository()

        response = consumption_repository.deposit_balance(body)

        recharge_balance = consumption_repository.get_consumption(body["client_id"])
        comparison_recharge_and_consumption = consumption_repository.comparison_recharge_and_consumption(body["client_id"])
        get_transactions = consumption_repository.get_transactions(body["client_id"])

        ConsumptionService.emit_event(body["client_id"], recharge_balance, comparison_recharge_and_consumption, get_transactions)

        return response


    @staticmethod
    def emit_event(client_id, widget, chart, transactions):
        """Este método se encarga de emitir un evento."""
        print("Antes de emitir el evento")
        print("chart",chart)
        if widget and chart:
            send = {
                "client_id": client_id,
                "widget": widget.to_dict()["data"],
                "chart": chart.to_dict()["data"] if chart else None,
                "transactions": transactions.to_dict()["data"]
            }
            print("datos a emitir",send)
            socketio.emit('server_event', send)
