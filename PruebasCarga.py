from locust import HttpUser, task, between
import os

class ReservaTest(HttpUser):
    wait_time = between(1, 3)
    token = None
    vehicle_id = None
    client_id = None
    reserva_id = None
    executed = False  

    ENVIRONMENT = os.getenv("ENV", "dev")
    BASE_URLS = {
        "dev": "http://localhost:3000/api",
        "prod": "https://examenfinal-7g7u.onrender.com/api"
    }
    BASE_URL = BASE_URLS.get(ENVIRONMENT, BASE_URLS["dev"])

    def on_start(self):
        """ Inicia sesión antes de comenzar las pruebas. """
        self.login()

    def login(self):
        """ Realiza el login y guarda el token. """
        credentials = {"email": "estefa@gmail.com", "password": "Estefa1234"}
        response = self.client.post(f"{self.BASE_URL}/login", json=credentials)
        if response.status_code == 200:
            self.token = response.json().get("token")
            print("✅ Login exitoso.")
        else:
            print(f"❌ No se pudo iniciar sesión: {response.status_code}, {response.text}")

    ### ==================== 🏎️ TAREA: VEHÍCULOS ====================
    @task
    def test_vehiculos(self):
        if not self.token:
            return

        headers = {"Authorization": f"Bearer {self.token}"}

        # ➤ Crear vehículo
        vehicle_data = {
            "marca": "Toyota",
            "modelo": "Corolla",
            "anio_fabricacion": 2022,
            "placa": "HTG-876",
            "color": "Gris",
            "tipo_vehiculo": "Sedán",
            "kilometraje": 25000,
            "descripcion": "Vehículo confiable y cómodo"
        }
        response = self.client.post(f"{self.BASE_URL}/vehiculos", json=vehicle_data, headers=headers)
        if response.status_code == 201:
            self.vehicle_id = response.json().get("vehiculo").get("_id")
            print(f"✅ Vehículo creado con ID {self.vehicle_id}.")
        else:
            print(f"❌ Error al crear vehículo: {response.status_code}, {response.text}")
            return

        # ➤ Consultar todos los vehículos
        response = self.client.get(f"{self.BASE_URL}/vehiculos", headers=headers)
        print(f"🔎 Vehículos obtenidos: {response.status_code}")

        # ➤ Actualizar vehículo
        updated_vehicle_data = {"id": self.vehicle_id, "color": "Negro"}
        response = self.client.put(f"{self.BASE_URL}/vehiculos", json=updated_vehicle_data, headers=headers)
        print(f"🔄 Vehículo actualizado: {response.status_code}")

        # ➤ Eliminar vehículo
        delete_data = {"id": self.vehicle_id}
        response = self.client.delete(f"{self.BASE_URL}/vehiculos", json=delete_data, headers=headers)
        print(f"🗑️ Vehículo eliminado: {response.status_code}")

    ### ==================== 🧑‍🤝‍🧑 TAREA: CLIENTES ====================
    @task
    def test_clientes(self):
        if not self.token:
            return

        headers = {"Authorization": f"Bearer {self.token}"}

        # ➤ Crear cliente
        client_data = {
            "cedula": "1723456789",
            "nombre": "Juan",
            "apellido": "Pérez",
            "ciudad": "Quito",
            "email": "juanperez@example.com",
            "direccion": "Av. Amazonas 123",
            "telefono": "0987654321",
            "fecha_nacimiento": "1990-05-15"
        }
        response = self.client.post(f"{self.BASE_URL}/clientes", json=client_data, headers=headers)
        if response.status_code == 201:
            self.client_id = response.json().get("cliente").get("_id")
            print(f"✅ Cliente creado con ID {self.client_id}.")
        else:
            print(f"❌ Error al crear cliente: {response.status_code}, {response.text}")
            return

        # ➤ Consultar todos los clientes
        response = self.client.get(f"{self.BASE_URL}/clientes", headers=headers)
        print(f"🔎 Clientes obtenidos: {response.status_code}")

        # ➤ Actualizar cliente
        updated_client_data = {"id": self.client_id, "telefono": "0999999999"}
        response = self.client.put(f"{self.BASE_URL}/clientes", json=updated_client_data, headers=headers)
        print(f"🔄 Cliente actualizado: {response.status_code}")

        # ➤ Eliminar cliente
        delete_data = {"id": self.client_id}
        response = self.client.delete(f"{self.BASE_URL}/clientes", json=delete_data, headers=headers)
        print(f"🗑️ Cliente eliminado: {response.status_code}")

    ### ==================== 📅 TAREA: RESERVAS ====================
    @task
    def test_reservas(self):
        if not self.token:
            return

        headers = {"Authorization": f"Bearer {self.token}"}

        # ➤ Crear cliente
        client_data = {
            "cedula": "1317862938",
            "nombre": "Erika",
            "apellido": "Lopez",
            "ciudad": "Quito",
            "email": "erikalopez@example.com",
            "direccion": "Av. Amazonas 123",
            "telefono": "0999738331",
            "fecha_nacimiento": "1995-04-16"
        }
        response = self.client.post(f"{self.BASE_URL}/clientes", json=client_data, headers=headers)
        if response.status_code == 201:
            self.client_id = response.json().get("cliente").get("_id")
            print(f"✅ Cliente creado con ID {self.client_id}.")
        else:
            print(f"❌ Error al crear cliente: {response.status_code}, {response.text}")
            return

        # ➤ Crear vehículo
        vehicle_data = {
            "marca": "Mazda",
            "modelo": "Mazda",
            "anio_fabricacion": 2020,
            "placa": "HTG-909",
            "color": "Gris",
            "tipo_vehiculo": "Sedán",
            "kilometraje": 23000,
            "descripcion": "Vehículo confiable y cómodo"
        }
        response = self.client.post(f"{self.BASE_URL}/vehiculos", json=vehicle_data, headers=headers)
        if response.status_code == 201:
            self.vehicle_id = response.json().get("vehiculo").get("_id")
            print(f"✅ Vehículo creado con ID {self.vehicle_id}.")
        else:
            print(f"❌ Error al crear vehículo: {response.status_code}, {response.text}")
            return

        # ➤ Crear reserva
        reserva_data = {
            "codigo": 123456,
            "descripcion": "Reserva revision",
            "id_cliente": self.client_id,
            "id_vehiculo": self.vehicle_id
        }
        response = self.client.post(f"{self.BASE_URL}/reservas", json=reserva_data, headers=headers)
        if response.status_code == 200:
            self.reserva_id = response.json().get("reserva").get("_id")
            print(f"✅ Reserva creada con ID {self.reserva_id}.")
        else:
            print(f"❌ Error al crear reserva: {response.status_code}, {response.text}")
            return

        # ➤ Consultar todas las reservas
        response = self.client.get(f"{self.BASE_URL}/reservas", headers=headers)
        print(f"🔎 Reservas obtenidas: {response.status_code}")

        # ➤ Actualizar reserva
        updated_reserva_data = {
            "id": self.reserva_id,  # Asegúrate de enviar el ID correcto de la reserva
            "codigo": 654321,  # Código de reserva actualizado
            "id_cliente": self.client_id,  # ID del cliente
            "id_vehiculo": self.vehicle_id  # ID del vehículo
        }

        # Realizar la solicitud PUT para actualizar la reserva
        response = self.client.put(f"{self.BASE_URL}/reservas", json=updated_reserva_data, headers=headers)

        # Mostrar respuesta
        if response.status_code == 200:
            print(f"✅ Reserva actualizada con éxito: {response.json()}")
        else:
            print(f"❌ Error al actualizar la reserva: {response.status_code}, {response.json()}")

        # ➤ Eliminar reserva
        delete_data = {"id": self.reserva_id}
        response = self.client.delete(f"{self.BASE_URL}/reservas", json=delete_data, headers=headers)
        print(f"🗑️ Reserva eliminada: {response.status_code}")