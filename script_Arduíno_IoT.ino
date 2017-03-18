#include <SPI.h>
#include <Ethernet.h>
String readString;

int luz1 = 6;
int luz2 = 8;

byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};
IPAddress ip(192, 168, 0, 115);

EthernetServer server(80);

void setup() {
  pinMode(luz1, OUTPUT);
  pinMode(luz2, OUTPUT);
  digitalWrite(luz1, HIGH);
  digitalWrite(luz2, HIGH); 
  Serial.begin(9600);
  while (!Serial) {
    ;
  }

  Ethernet.begin(mac, ip);
  server.begin();
  Serial.print("server is at ");
  Serial.println(Ethernet.localIP());
}


void loop() {
  EthernetClient client = server.available();
  if (client) {
    Serial.println("new client");
    boolean currentLineIsBlank = true;
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        
        if (readString.length() < 100) {
          readString += c;
        }
        Serial.write(c);
        if (c == '\n' && currentLineIsBlank) {
          if (readString.indexOf("?luz1") > 0)
          {
            if(digitalRead(luz1)){
              digitalWrite(luz1, LOW);
            }else{
              digitalWrite(luz1, HIGH);
            }
          }

          if (readString.indexOf("?luz2") > 0)
          {
            if(digitalRead(luz2)){
              digitalWrite(luz2, LOW);
            }else{
              digitalWrite(luz2,HIGH);
            }
          }
    
          
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: text/html");
          client.println("Connection: close");
          client.println();
          client.println("<!DOCTYPE HTML>");
          client.println("<html>");
          client.println("<p>IoT Server</p>");
          client.println("<a href=\"/?luz1\"\">Luz 1</a>");
          client.println("<br><a href=\"/?luz2\">Luz 2</a>");
          client.println("<br> readString: ");
          client.print(readString);
          client.println("</html>");          
          readString = "";       
          break;
        }
        if (c == '\n') {
          currentLineIsBlank = true;
        } else if (c != '\r') {
          currentLineIsBlank = false;
        }
      }
    }
    delay(1);
    client.stop();
    Serial.println("client disconnected");
  }
}
