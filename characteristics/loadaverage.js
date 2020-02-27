var bleno = require('bleno');
var os = require('os');
var util = require('util');

var BlenoCharacteristic = bleno.Characteristic;

var LoadAverageCharacteristic = function() {
 LoadAverageCharacteristic.super_.call(this, {
    uuid: '2c88d84b-03e9-41e5-8832-ebd8cabf115e ',
    properties: ['read'],
  });

 this._value = new Buffer(0);
};

LoadAverageCharacteristic.prototype.onReadRequest = function(offset, callback) {

  if(!offset) {

    var loadAverage = os.loadavg().map(function(currentValue, index, array){

      return currentValue.toFixed(3);
    });

    this._value = new Buffer(JSON.stringify({
      'oneMin' : loadAverage[0],
      'fiveMin': loadAverage[1],
      'fifteenMin': loadAverage[2]
    }));
  }

  console.log('LoadAverageCharacteristic - onReadRequest: value = ' +
    this._value.slice(offset, offset + bleno.mtu).toString()
  );

  callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

util.inherits(LoadAverageCharacteristic, BlenoCharacteristic);
module.exports = LoadAverageCharacteristic;
