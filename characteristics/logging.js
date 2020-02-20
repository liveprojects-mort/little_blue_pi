var bleno = require('bleno');
var os = require('os');
var util = require('util');
var sensor = require("./runHeartSensor");

//var spawn = require("child_process").spawn;
//sensor = spawn("sensor", ["/home/pi/github/little_blue_pi/little_blue_pi/characteristics/runHeartSensor.js"]);

var BlenoCharacteristic = bleno.Characteristic;

var loggingCharacteristic = function() {

 loggingCharacteristic.super_.call(this, {
     uuid: '8df71e84-7d7f-4739-a6f9-a42577fe904a',
     properties: ['write','read'],
    });

    this._value = new Buffer(0);
};

loggingCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {

    if(!offset) {

        this._value = data;
    }

    console.log('loggingCharacteristic - onWriteRequest: value = ' +
    this._value.slice(offset, offset + bleno.mtu).toString()
  );

  if( this._value == 1)
  {
    sensor.startLogging();
  }


  callback(this.RESULT_SUCCESS, this._value);
};

loggingCharacteristic.prototype.onReadRequest = function(offset, callback) {

  if(!offset) {

      this._value = new Buffer(JSON.stringify(
        sensor.isLogging()
        ));
  }

  console.log('loggingCharacteristic - onReadRequest: value = ' +
  this._value.slice(offset, offset + bleno.mtu).toString()
);

callback(this.RESULT_SUCCESS, this._value);
};

util.inherits(loggingCharacteristic, BlenoCharacteristic);
module.exports = loggingCharacteristic;


