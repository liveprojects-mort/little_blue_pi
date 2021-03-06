var bleno = require('bleno');
var util = require('util');


var SetDirCharacteristic = require('./filesystemCharacteristics/set_dir');
var SetFileCharacteristic = require('./filesystemCharacteristics/set_file');

function FilesystemAccessService() {

  bleno.PrimaryService.call(this, {
    uuid: 'a348a57a-27cd-4b42-9538-c3ae1b940b54',
    characteristics: [
      new SetDirCharacteristic(),
      new SetFileCharacteristic()
    ]
  });
};

util.inherits(FilesystemAccessService, bleno.PrimaryService);
module.exports = FilesystemAccessService;