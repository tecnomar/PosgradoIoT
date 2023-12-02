#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>

const char* ssid = "TORRES2.4G"; // Rellena con el nombre de tu red WiFi
const char* password = "15590179"; // Rellena con la contraseña de tu red WiFi
 
const char* host = "192.168.0.34";
const int port = 80;
const String ruta = "/posgradoIoT/core/ajax/servicios/estadoActuadores.php";

const  int ledESP8266 = LED_BUILTIN;

const int ledPin1 = 5;//D1
const int ledPin2 = 4;//D2
const int ledPin3 = 0;//D3
const int ledPin4 = 15;//D8
const int ledPin5 = 14;//D5
const int ledPin6 = 13;//D7

void setup() {

  pinMode(ledESP8266, OUTPUT);
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  pinMode(ledPin3, OUTPUT);
  pinMode(ledPin4, OUTPUT);
  pinMode(ledPin5, OUTPUT);
  pinMode(ledPin6, OUTPUT);
  
  digitalWrite(ledESP8266, HIGH);
  digitalWrite(ledPin1, HIGH);
  digitalWrite(ledPin2, HIGH);
  digitalWrite(ledPin3, HIGH);
  digitalWrite(ledPin4, HIGH);
  digitalWrite(ledPin5, HIGH);
  digitalWrite(ledPin6, HIGH);
  
  Serial.begin(115200);
  delay(10);
 
  // Conectamos a la red WiFi
 
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
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

  // Crea un objeto WiFiClient para la comunicación HTTP
  WiFiClient client;

  // Realiza la solicitud HTTP al servidor
  if (client.connect(host, port)) {
    //Serial.println("Conexión al servidor establecida");
    client.print(String("GET ") + ruta + " HTTP/1.1\r\n" +
                 "Host: " + host + "\r\n" +
                 "Connection: close\r\n\r\n");
    
    // Espera la respuesta del servidor
    while (!client.available()) {
      delay(100);
    }

    // Lee y almacena la respuesta HTTP en una cadena
    String response = client.readString();
    response.trim();

    int jsonStart = response.indexOf('[');
    int jsonEnd = response.lastIndexOf(']');
    if (jsonStart >= 0 && jsonEnd >= 0) {
      response = response.substring(jsonStart, jsonEnd + 1);
    }
    // Serial.println("Respuesta del servidor:");
    //Serial.println(response);

    // Parsea la respuesta JSON
    DynamicJsonDocument doc(2048); // Tamaño máximo del documento JSON
    DeserializationError error = deserializeJson(doc, response);
    
    // Verifica si hubo un error al parsear
    if (error) {
      Serial.println("Error al parsear JSON");
    } else {
      // Accede directamente a los campos del objeto JSON y controla los LEDs según el estado
      int estadoLED_BUILTIN = doc[2]["estado"].as<int>();// Chapa electrica
      int estadoD1 = doc[5]["estado"].as<int>();// Foco 1 Direccion
      int estadoD2 = doc[7]["estado"].as<int>();// Foco 1 Pasadizo
      int estadoD3 = doc[9]["estado"].as<int>();// Foco 2 Pasadizo
      int estadoD4 = doc[10]["estado"].as<int>();// Foco 3 Pasadizo
      int estadoD5 = doc[6]["estado"].as<int>();// Foco 1 Administrador
      int estadoD6 = doc[8]["estado"].as<int>();// Foco 2 Administrador

      controlarLED(ledESP8266, estadoLED_BUILTIN);
      controlarLED(ledPin1, estadoD1);
      controlarLED(ledPin2, estadoD2);
      controlarLED(ledPin3, estadoD3);
      controlarLED(ledPin4, estadoD4);
      controlarLED(ledPin5, estadoD5);
      controlarLED(ledPin6, estadoD6);

      Serial.println("Chapa Electrica : " + String(estadoLED_BUILTIN));
      Serial.println("Foco Direccion 1 : " + String(estadoD1));
      Serial.println("Foco Pasadizo 1 : " + String(estadoD2));
      Serial.println("Foco Pasadizo 2 : " + String(estadoD3));
      Serial.println("Foco Pasadizo 3 : " + String(estadoD4));
      Serial.println("Foco Administracion 1 : " + String(estadoD5));
      Serial.println("Foco Administracion 2 : " + String(estadoD6));
    }
   
  }
  // Espera un tiempo antes de realizar la próxima solicitud
 
  for (int i = 0; i <= 1 ; i++) {
    delay(100);
  }
}

void controlarLED(int pin, int estado) {
  if (pin == LED_BUILTIN){
    if (estado == 0) {
      digitalWrite(pin, HIGH); // Enciende el LED
    } else if (estado == 1) {
      digitalWrite(pin, LOW); // Apaga el LED
    }
  } else {
    if (estado == 1) {
      digitalWrite(pin, HIGH); // Enciende el LED
    } else if (estado == 0) {
      digitalWrite(pin, LOW); // Apaga el LED
    }
  }
}





