var bleno = require('bleno');

var SystemInformationService = require('./systeminformationservice');
var FilesystemService = require('./filesystemaccessservice');
var filesystemService = new FilesystemService();

var systemInformationService = new SystemInformationService();

bleno.on('accept', function(address){
  console.log("accepted: " + address);
});

bleno.on('disconnect', function(address){
  console.log("disconnected: " + address);
});


bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {

    bleno.startAdvertising("Vital Signs Raspberry Pi", [systemInformationService.uuid]);
  }
  else {

    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {

  console.log('on -> advertisingStart: ' +
    (error ? 'error ' + error : 'success')
  );

  if (!error) {

    bleno.setServices([
      systemInformationService,
      filesystemService
    ]);
  }
});
