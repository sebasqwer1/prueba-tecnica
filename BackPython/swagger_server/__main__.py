# __main__.py
#!/usr/bin/env python3

import connexion
from flask_cors import CORS
from swagger_server import encoder
from swagger_server.config.socketio_instance import socketio
import eventlet
import eventlet.wsgi

def main():
    app = connexion.App(__name__, specification_dir='./swagger/')
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api('swagger.yaml', arguments={'title': 'Bss Service'}, pythonic_params=True)

    # Inicializar CORS con la aplicación Flask
    CORS(app.app)

    # Inicializar SocketIO con la aplicación Flask
    socketio.init_app(app.app, cors_allowed_origins=["http://192.168.3.66:4200"])

    # Definir un evento de ejemplo
    @socketio.on('connect')
    def handle_connect():
        print('Cliente conectado')
        socketio.emit('response', {'message': 'Conexión exitosa'})

    @socketio.on('disconnect')
    def handle_disconnect():
        print('Cliente desconectado')

    # Ejecutar la aplicación con eventlet
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app.app)

if __name__ == '__main__':
    main()