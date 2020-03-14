var bleno = require('bleno');
var util = require('util');

var LoadAverageCharacteristic = require('./characteristics/loadaverage');
var UptimeCharacteristic = require('./characteristics/uptime');
var MemoryCharacteristic = require('./characteristics/memory');
var HelloWorldCharacteristic = require('./characteristics/helloWorld');
var loggingCharacteristic = require('./characteristics/logging');

function SystemInformationService() {

  bleno.PrimaryService.call(this, {
    uuid: '8df71e84-7d7f-4739-a6f9-a42577fe904a',
    characteristics: [
      
      new LoadAverageCharacteristic(),
      new UptimeCharacteristic(),
      new MemoryCharacteristic(),
      new HelloWorldCharacteristic(),
      
      new loggingCharacteristic()
    ]
  });
};

util.inherits(SystemInformationService, bleno.PrimaryService);
module.exports = SystemInformationService;
