var bleno = require('bleno');
var spawn = require("child_process").spawn;
var systemProcess = require('process');
var pythonProcess = null;


function startLogging()
{ 

        if (! pythonProcess)
        {
            pythonProcess = spawn ("python",["/home/pi/github/little_pulse/little_pulse/code/pulse_sensor/pulsesensor2.py"]);

        }
        
        


}

function stopLogging()
{ 

		
		if(!! pythonProcess)
        {
            pythonProcess.kill();
            pythonProcess == null;
        }


}


function isPidActive(pid){
    var result = true;
    try{
        // dummy kill. Will throw if PID not found
        systemProcess.kill(pid,0); 
    }catch(e){
        result = false;
    }
    
    return result;
}

function isLogging()
{ 
    var result = false;
    if(!!pythonProcess){
        console.log('This process is your pid ' + pythonProcess.pid);
        result = isPidActive(pythonProcess.pid);
    }

    return result;

}


module.exports = {startLogging : startLogging,
stopLogging : stopLogging,
isLogging : isLogging};


