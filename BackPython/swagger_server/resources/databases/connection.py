import mysql.connector
from mysql.connector import Error

class DBConnection:
    """Clase para manejar la conexión a la base de datos."""
    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.connection = None

    def connect(self):
        """Establece la conexión a la base de datos."""
        try:
            self.connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database,
                charset='utf8mb4'
            )
            if self.connection.is_connected():
                print("Conexión exitosa a la base de datos")
        except Error as e:
            print(f"Error al conectar a la base de datos: {e}")
            self.connection = None

    def disconnect(self):
        """Cierra la conexión a la base de datos."""
        if self.connection is not None and self.connection.is_connected():
            self.connection.close()