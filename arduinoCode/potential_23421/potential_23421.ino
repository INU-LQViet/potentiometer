#include <millisDelay.h>

millisDelay sensorDelay;

int pot_pin = A0;
int curSignal = 0;
int preSignal = 0;
int sensorSpeed = 0;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  sensorDelay.start(100);
};

void loop() {
  // put your main code here, to run repeatedly:
  if(sensorDelay.justFinished()){
    sensorDelay.repeat();
    curSignal = analogRead(pot_pin);
    sensorSpeed = floor(abs(curSignal - preSignal)*100);
    preSignal = curSignal;
    Serial.println(String("[" + String(curSignal)+","+String(sensorSpeed)+"]"));
  };  
};
