var bleno = require('bleno');
var os = require('os');
var util = require('util');

var BlenoCharacteristic = bleno.Characteristic;

var UptimeCharacteristic = function() {

 UptimeCharacteristic.super_.call(this, {
    name: 'uptime',
    uuid: 'a3c33105-3701-4ea8-96bf-045a1f64fcd1',
    properties: ['read'],
  });

 this._value = new Buffer(0);
};

UptimeCharacteristic.prototype.onReadRequest = function(offset, callback) {

  if(!offset) {

    this._value = new Buffer(JSON.stringify({
      'uptime' : os.uptime()
    }));
  }

  console.log('UptimeCharacteristic - onReadRequest: value = ' +
    this._value.slice(offset, offset + bleno.mtu).toString()
  );

  callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

util.inherits(UptimeCharacteristic, BlenoCharacteristic);
module.exports = UptimeCharacteristic;
