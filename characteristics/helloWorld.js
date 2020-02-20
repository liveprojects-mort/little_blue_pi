var bleno = require('bleno');
var os = require('os');
var util = require('util');

var BlenoCharacteristic = bleno.Characteristic;

var HelloWorldCharacteristic = function() {

 HelloWorldCharacteristic.super_.call(this, {
     uuid: '8df71e84-7d7f-4739-a6f9-a42577fe904a',
     properties: ['read'],
    });

    this._value = new Buffer(0);
};

HelloWorldCharacteristic.prototype.onReadRequest = function(offset, callback) {

    if(!offset) {

        this._value = new Buffer(JSON.stringify(
            'Hello World!'
          ));
    }

    console.log('HelloWorldCharacteristic - onReadRequest: value = ' +
    this._value.slice(offset, offset + bleno.mtu).toString()
  );

  callback(this.RESULT_SUCCESS, this._value);
};

util.inherits(HelloWorldCharacteristic, BlenoCharacteristic);
module.exports = HelloWorldCharacteristic;
