<?php

function enviar($enviado) {
        //'$enviado = str_replace("\n","",$enviado);
        $enviado = str_replace(["\n", '"'], [' ', '\''], $enviado);
        //TOKEN QUE NOS DA FACEBOOK
        $token = 'EAAIso2eygUcBOyR9ZCRbnM23QGfXDcB7qtYnvHL7D0ZAceeLvKNPE2b9bxHxqTQ06d0GlI23M3JPRhWS6m4y1
        jwBm2ZAAM8V2VeBRM227sMrLKcdKLuwoZAsNOJ0YsLGI5w1A0LiahzS0VIz0bUJGk5oruV0g9ipSfCwKERWJXyCBIgHoFQZBvme7SSQkyldy';
        //NUESTRO TELEFONO
        $telefono = '51982874962';
        //URL A DONDE SE MANDARA EL MENSAJE
        $url = 'https://graph.facebook.com/v17.0/126858530509534/messages';

        $mensaje = '{
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": "'.$telefono.'",
                "type": "text",
                "text": {
                        "preview_url": true,
                        "body": "'.$enviado.'"
                }
        }';

        //DECLARAMOS LAS CABECERAS
        $header = array("Authorization: Bearer " . $token, "Content-Type: application/json",);
        //INICIAMOS EL CURL
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $mensaje);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        //OBTENEMOS LA RESPUESTA DEL ENVIO DE INFORMACION
        $response = json_decode(curl_exec($curl), true);
        //IMPRIMIMOS LA RESPUESTA
        //print_r($response);
        //OBTENEMOS EL CODIGO DE LA RESPUESTA
        $status_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        //CERRAMOS EL CURL
        curl_close($curl);
}
