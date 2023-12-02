include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <WiFiClient.h>
const char* ssid = "Wokwi-GUEST";
const char* password = "";
//COLOCAMOS EL TOKEN QUE NOS ENTREGA META
String token="Bearer EAAIso2eygUcBOyR9ZCRbnM23QGfXDcB7qtYnvHL7D0ZAceeLvKNPE2b9bxHxqTQ06d0GlI23M3JPRhWS6m4y1jwBm2ZAAM8V2VeBRM227sMrLKcdKLuwoZAsNOJ0YsLGI5w1A0LiahzS0VIz0bUJGk5oruV0g9ipSfCwKERWJXyCBIgHoFQZBvme7SSQkyldy";
//COLOCAMOS LA URL A DONDE SE ENVIAN LOS MENSAJES DE WHATSAPP
String servidor = "https://graph.facebook.com/v17.0/126858530509534/messages";
//RUTA PARA OBTENER DATOS DE LA PUERTA
const char* host = "burro-secure-ultimately.ngrok-free.app";
const int port = 443;
const String ruta = "/PosgradoIoT/core/ajax/servicios/estadoActuadores.php";
//CREAMOS UNA JSON DONDE SE COLOCA EL NUMERO DE TELEFONO Y EL MENSAJE
String payload = "{\"messaging_product\":\"whatsapp\",\"recipient_type\":\"individual\",\"to\":\"51982874962'\",\"type\": \"text\",\"text\": {\"preview_url\": true,\"body\": \"Movimiento detectado\"}}";

//String payload = "{\"messaging_product\":\"whatsapp\",\"to\":\"51982874962\",\"type\":\"text\",\"text\": {\"body\": \"Movimiento detectado\"}}";
//PIN DEL SENSOR DE MOVIMIENTO
const int pinSensorMov = 15;
//ESTADO DEL SENSOR
int estadoActual=LOW;
void setup() {
  Serial.begin(9600);
  //ACTIVAMOS EL PIN SEL SENSOR DE MOVIMIENTO
  pinMode(pinSensorMov, INPUT);
  //COLOCAMOS USUARIO Y CONTRASEÑA DE NUESTRA RED WIFI
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Se ha conectado al wifi con la ip: ");
  Serial.println(WiFi.localIP());
}
void loop() {
  //obtenerEstadoPuerta();
  // Crea un objeto WiFiClient para la comunicación HTTP
  WiFiClient client;

  // Realiza la solicitud HTTP al servidor
  if (client.connect(host, port)) {
    Serial.println("Conexión al servidor establecida");
    client.print(String("GET ") + ruta + " HTTP/1.1\r\n" +
                 "Host: " + host + "\r\n" +
                 "Connection: close\r\n\r\n");
                
  //DETECTAMOS EL ESTADO DEL DETECTO DE OVIMIENTO
  estadoActual = digitalRead(pinSensorMov);
  //SI SE DETECTA MOVIMIENTO
   if (estadoActual == HIGH) {
    Serial.println("Hay Movimiento");
    //delay(5000);
    if(WiFi.status()== WL_CONNECTED){
      //INICIAMOS EL OBJETO HTTP QUE POSTERIORMENTE ENVIARA EL MENSAJE
      HTTPClient http;
      //COLOCAMOS LA URL DEL SERVIDOR A DONDE SE ENVIARA EL MENSAJE
      http.begin(servidor.c_str());
      //COLOCAMOS LA CABECERA DONDE INDICAMOS QUE SERA TIPO JSON
      http.addHeader("Content-Type", "application/json"); 
      //AGREGAMOS EL TOKEN EN LA CABECERA DE LOS DATOS A ENVIAR
      http.addHeader("Authorization", token);    
      //ENVIAMOS LOS DATOS VIA POST
      int httpPostCode = http.POST(payload);
      //SI SE LOGRARON ENVIAR LOS DATOS
      // Si se lograron enviar los datos
      if (httpPostCode > 0) {
          // Recibimos la respuesta que nos entrega el servidor
          String httpResponse = http.getString();
          
          // Imprimimos la respuesta en la consola
          Serial.print("HTTP Response: ");
          Serial.println(httpResponse);
          
          // Puedes realizar cualquier procesamiento adicional con la respuesta aquí
          // ...
      } else {
          Serial.print("Error code: ");
          Serial.println(httpPostCode);
      }

      

      http.end();

    
     
    }
    else {
      Serial.println("WiFi Desconectado");
    }
  }
  //SI NO SE DETECTA MOVIMIENTO
  else{
    Serial.println("No hay Movimiento");
  }
  delay(10000);
}

