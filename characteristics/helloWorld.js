var bleno = require('bleno');
var os = require('os');
var util = require('util');

var BlenoCharacteristic = bleno.Characteristic;

var HelloWorldCharacteristic = function() {

 HelloWorldCharacteristic.super_.call(this, {
     name: 'Hello',
     uuid: '5aff19d1-3a6f-4c04-94a0-b333c0658898',
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
