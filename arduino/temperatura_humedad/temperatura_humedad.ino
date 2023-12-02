#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <DHT.h>
#include <DHT_U.h>

const char* ssid = "TORRES2.4G"; // Rellena con el nombre de tu red WiFi
const char* password = "15590179"; // Rellena con la contraseña de tu red WiFi
 
const char* host = "192.168.0.34";
const int port = 80;
const String ruta = "/posgradoIoT/core/ajax/servicios/temperatura_humedad.php";

const int dhtPin = 12;//D6

DHT dht(dhtPin, DHT11);
int Humedad;
float Temperatura;
int SensorIdTemperatura;
int SensorIdHumedad;

void setup() {
  Serial.begin(115200);
  dht.begin();
 
  // Conectamos a la red WiFi
 
  Serial.println();
  Serial.println();
  Serial.print("Conectando a ");
  Serial.println(ssid);
 
  // Conéctate a la red WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }

  Serial.println("Conexión WiFi establecida");

}

void loop() {
  Humedad = dht.readHumidity();
  Temperatura = dht.readTemperature();
  SensorIdTemperatura = 3;
  SensorIdHumedad = 5;

  if(isnan(Humedad) || isnan(Temperatura)){
    Serial.println("Error en el sensor");
    return;
  }
  // Serial.print("SensorId: ");
  // Serial.println(SensorId);
  // Serial.print("Humedad: ");
  // Serial.println(Humedad);
  // Serial.print("Temperatura: ");
  // Serial.println(Temperatura);

  StaticJsonDocument<200> jsonDoc;
  jsonDoc["SensorIdTemperatura"] = SensorIdTemperatura;
  jsonDoc["SensorIdHumedad"] = SensorIdHumedad;
  jsonDoc["Humedad"] = Humedad;
  jsonDoc["Temperatura"] = Temperatura;

  String jsonString;
  serializeJson(jsonDoc, jsonString);

  // Crea un objeto WiFiClient para la comunicación HTTP
  WiFiClient client;

  // Realiza la solicitud HTTP al servidor
  if (client.connect(host, port)) {
    
    // Crear el cuerpo de la solicitud POST
    String postData = "datos=" + jsonString;

    // Enviar la solicitud POST al servidor
    client.print("POST " + ruta + " HTTP/1.1\r\n");
    client.print("Host: " + String(host)+ "\r\n");
    client.print("Content-Type: application/x-www-form-urlencoded\r\n");
    client.print("Content-Length: " + String(postData.length()) + "\r\n");
    client.print("\r\n");
    client.print(postData);

    // Espera la respuesta del servidor
    while (!client.available()) {
      delay(100);
    }

    // Ignora las líneas de la cabecera hasta que encuentres una línea en blanco
    while (client.available()) {
      String line = client.readStringUntil('\n');
      if (line == "\r") {
        break; // Fin de la cabecera
      }
    }

    // Lee y almacena la respuesta HTTP en una cadena
    String response = client.readString();
    response.trim();
   
    Serial.println(response);
  }
  // Espera un tiempo antes de realizar la próxima solicitud
 
  for (int i = 0; i <= 1 ; i++) {
    delay(100);
  }
}



