from swagger_server.resources.databases.connection import DBConnection
from swagger_server.models.consumption_response import ConsumptionResponse
from swagger_server.models.record_consumption import RecordConsumption
from swagger_server.models.record_consumption_response import RecordConsumptionResponse
from swagger_server.models.login_response import LoginResponse
from swagger_server.models.login_response_data import LoginResponseData
from swagger_server.models.consumption_graph_response import ConsumptionGraphResponse
from swagger_server.models.consumption_graph_response_data import ConsumptionGraphResponseData
from swagger_server.models.transactions_response import TransactionsResponse
from swagger_server.models.transactions_response_data import TransactionsResponseData

class ConsumptionRepository:
    """Clase para manejar la lógica de acceso a los datos de consumo."""

    log_message = "ITID: %r - ETID: %r - Funcion: %r - Paquete : %r - Mensaje:  %r  "

    def __init__(self):
        """Inicializa la conexión a la base de datos."""
        self.db = DBConnection(host="192.168.3.66", user="root", password="sebasqwer1", database="prueba_tecnica")

    def login(self, username: str, password: str):
        """Este método se encarga de realizar el inicio de sesión."""
        try:
            self.db.connect()
            query = "SELECT * FROM client WHERE username = %s AND password = %s"
            params = (username, password)
            cursor = self.db.connection.cursor()
            cursor.execute(query, params)
            resultados = cursor.fetchone()
            print("res", resultados)
            response = None
            if resultados:
                records = LoginResponseData(
                    client_id=resultados[0],
                    user_name=resultados[2],
                    name=resultados[1]
                )
                response = LoginResponse(code=200, message="Consulta exitosa", data=records)
            else:
                response = LoginResponse(code=404, message="usuario o contraseña incorrecta", data=[])
            return response
        except Exception as e:
            print(f"Error durante la transacción: {e}")
        finally:
            self.db.disconnect()

    def get_transactions(self, client_id: int):
        """Este método se encarga de obtener las transacciones de los clientes."""
        try:
            self.db.connect()
            query = """
                    SELECT  
                            balance, creation_date, type 
                        FROM consumption_history
                        WHERE  (TYPE = 1 OR TYPE = 3) AND client_id = %s
                        ORDER BY creation_date DESC
            """
            params = (int(client_id),)
            cursor = self.db.connection.cursor()
            cursor.execute(query, params)
            result = cursor.fetchall()
            if len(result) > 0:
                records = []
                for row in result:
                    record = TransactionsResponseData(
                        balance=row[0],
                        creation_date=row[1].isoformat() if row[1] else None,
                        type=row[2]
                    )
                    records.append(record)
                response = TransactionsResponse(code=200, message="Datos obtenidos exitosamente", data=records)
            else:
                response = TransactionsResponse(code=404, message="No hay datos", data=[])
            return response
        except Exception as e:
            print(f"Error durante la transacción: {e}")
            self.db.connection.rollback()
            return []
        finally:
            self.db.disconnect()

    def comparison_recharge_and_consumption(self, client_id: int):
        """Este método se encarga de comparar la recarga y el consumo."""
        try:
            self.db.connect()
            consumption_query  = """
                SELECT 
                    DATE_FORMAT(creation_date, '%Y-%m') AS month,
                    SUM(consumption) AS total_consumption
                FROM 
                    consumption_history
                WHERE 
                    TYPE = 2 AND client_id = %s
                GROUP BY 
                    month
                ORDER BY 
                    month;
            """
            params = (int(client_id),)
            cursor = self.db.connection.cursor()
            cursor.execute(consumption_query, params)
            consumption_result = cursor.fetchall()
            consumption_recharge  = """
                SELECT 
                    DATE_FORMAT(creation_date, '%Y-%m') AS month,
                    SUM(consumption) AS total_consumption
                FROM 
                    consumption_history
                WHERE 
                    TYPE = 1 AND client_id = %s
                GROUP BY 
                    month
                ORDER BY 
                    month;
            """
            cursor.execute(consumption_recharge, params)
            recharge_result = cursor.fetchall()
            print("consumption_result", consumption_result)
            print("recharge_result", recharge_result)
            if(len(recharge_result) > 0 or len(consumption_result) > 0):
                records = ConsumptionGraphResponseData(
                    client_id=client_id,
                    consumption=consumption_result,
                    recharge=recharge_result
                )
                response = ConsumptionGraphResponse(code=404, message="Datos obtenidos exitosamente", data=records)
            else:
                response = ConsumptionGraphResponse(code=404, message="No hay datos", data={})
            return response
        except Exception as e:
            print(f"Error durante la transacción: {e}")
            self.db.connection.rollback()
            return []
        finally:
            self.db.disconnect()

    def get_consumption(self, client_id: int):
        """Este método se encarga de obtener el consumo de los clientes."""
        try:
            self.db.connect()
            query = "SELECT * FROM consumption WHERE client_id = %s"
            params = (int(client_id),)
            cursor = self.db.connection.cursor()
            cursor.execute(query, params)
            resultados = cursor.fetchone()
            print("res", resultados)
            response = None
            if resultados:
                records = RecordConsumption(
                    client_id=resultados[1],
                    balance=resultados[2],
                    consumption=resultados[3],
                    minutes=resultados[4]
                )
                response = ConsumptionResponse(code=200, message="Consulta exitosa", data=records)
            else:
                response = ConsumptionResponse(code=404, message="No hay datos", data=[])
            return response
        except Exception as e:
            print(f"Error durante la transacción: {e}")
            self.db.connection.rollback()
            return []
        finally:
            self.db.disconnect()

    def get_package_by_id(self, cursor, package_id):
        """Este método se encarga de obtener el paquete por id."""
        query = "SELECT * FROM packages WHERE id = %s"
        params = (int(package_id),)
        cursor.execute(query, params)
        existing_record = cursor.fetchone()
        return existing_record

    def get_current_balance(self, cursor, client_id):
        """Este método se encarga de obtener el saldo actual de un cliente."""
        query = "SELECT * FROM consumption WHERE client_id = %s"
        params = (int(client_id),)
        cursor.execute(query, params)
        existing_record = cursor.fetchone()
        return existing_record

    def recharge_balance(self, data: dict):
        """Este método se encarga de recargar el saldo de los clientes."""
        try:
            self.db.connect()
            cursor = self.db.connection.cursor()
            existing_record = self.get_package_by_id(cursor, data['package'])
            if existing_record:
                existing_record_data = self.get_current_balance(cursor, data['client_id'])
                if existing_record_data:
                    if (existing_record_data[2] - existing_record[2]) < 0:
                        return RecordConsumptionResponse(code=400, message="Saldo insuficiente")
                    query_update = """
                        UPDATE consumption
                        SET balance = balance - %s,
                        consumption = consumption + %s,
                        minutes = minutes + %s,
                        user_modification = %s,
                        modification_date = NOW()
                        WHERE client_id = %s
                    """
                    params_update = (
                        float(existing_record[2]),
                        float(existing_record[3]),
                        int(existing_record[4]),
                        "BSS",
                        int(data['client_id'])
                    )
                    cursor.execute(query_update, params_update)
                else:
                    return RecordConsumptionResponse(code=400, message="Saldo insuficiente")
                query_insert_history = """
                    INSERT INTO consumption_history (client_id, balance, consumption, minutes, type, user_creation)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """
                params_history = (
                    data['client_id'],
                    float(existing_record[2]),
                    float(existing_record[3]),
                    int(existing_record[4]),
                    1,
                    "BSS"
                )
                cursor.execute(query_insert_history, params_history)
                self.db.connection.commit()
                response = RecordConsumptionResponse(code=200, message="Recarga exitosa")
            else:
                response = RecordConsumptionResponse(code=404, message="Paquete no encontrado")
            return response
        except Exception as e:
            print(f"Error durante la transacción: {e}")
            self.db.connection.rollback()
            return RecordConsumptionResponse(code=500, message="Error al recargar el saldo")
        finally:
            self.db.disconnect()

    def record_consumption(self, data: dict):
        """Este método se encarga de registrar el consumo de los clientes."""
        try:
            self.db.connect()
            cursor = self.db.connection.cursor()
            existing_record = self.get_current_balance(cursor, data['client_id'])
            print("existing_record", existing_record)
            if existing_record:
                if (existing_record[3] - data['consumption']) < 0:
                    return RecordConsumptionResponse(
                        code=400,
                        message="Consumo de datos excede el límite"
                    )
                if (existing_record[4] - data['minutes']) < 0:
                    return RecordConsumptionResponse(
                        code=400,
                        message="Consumo de minutos excede el límite"
                    )
                query_update = """
                    UPDATE consumption
                    SET
                        consumption = %s, 
                        minutes = %s,
                        modification_date = NOW(),
                        user_modification = %s
                    WHERE client_id = %s
                """
                params_update = (
                    existing_record[3] - data['consumption'],
                    existing_record[4] - data['minutes'],
                    "BSS",
                    int(data['client_id'])
                )
                cursor.execute(query_update, params_update)
                query_insert_history = """
                    INSERT INTO consumption_history (client_id, balance, consumption, minutes, type, user_creation)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """
                params_history = (
                    data['client_id'],
                    existing_record[2],
                    data['consumption'],
                    data['minutes'],
                    2,
                    "BSS"
                )
                cursor.execute(query_insert_history, params_history)
                self.db.connection.commit()
                response = RecordConsumptionResponse(code=200, message="Actualización exitosa")
            else:
                response = RecordConsumptionResponse(code=400, message="No tiene paquetes activos")
            return response
        except Exception as e:
            print(f"Error durante la transacción: {e}")
            self.db.connection.rollback()
            return RecordConsumptionResponse(code=500, message="Error al registrar el consumo")
        finally:
            self.db.disconnect()

    def deposit_balance(self, data: dict):
        """Este método se encarga de depositar el saldo por clientes."""
        try:
            self.db.connect()
            cursor = self.db.connection.cursor()
            existing_record_data = self.get_current_balance(cursor, data['client_id'])
            if existing_record_data:
                query_update = """
                    UPDATE consumption
                    SET balance = balance + %s,
                    user_modification = %s,
                    modification_date = NOW()
                    WHERE client_id = %s
                """
                params_update = (
                    float(data['balance']),
                    "BSS",
                    int(data['client_id'])
                )
                cursor.execute(query_update, params_update)
            else:
                query_insert = """
                    INSERT INTO consumption (client_id, balance, consumption, minutes, user_creation)
                    VALUES (%s, %s, %s, %s, %s)
                """
                params_insert = (
                    data['client_id'],
                    data['balance'],
                    0,
                    0,
                    "BSS"
                )
                cursor.execute(query_insert, params_insert)
                self.db.connection.commit()
            existing_record_data = self.get_current_balance(cursor, data['client_id'])
            if existing_record_data:
                query_insert_history = """
                    INSERT INTO consumption_history (client_id, balance, consumption, minutes, type, user_creation)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """
                params_history = (
                    data['client_id'],
                    data['balance'],
                    existing_record_data[3],
                    existing_record_data[4],
                    3,
                    "BSS"
                )
                cursor.execute(query_insert_history, params_history)
                self.db.connection.commit()
            response = RecordConsumptionResponse(code=200, message="Recarga exitosa")
            return response
        except Exception as e:
            print(f"Error durante la transacción: {e}")
            self.db.connection.rollback()
            return RecordConsumptionResponse(code=500, message="Error al recargar el saldo")
        finally:
            self.db.disconnect()