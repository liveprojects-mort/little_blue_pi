var bleno = require('bleno');
var spawn = require("child_process").spawn;
var systemProcess = require('process');
var pythonProcess = null;
var pythonProcess2 = null;




function startLogging()
{ 

        if (! pythonProcess)
        {
            pythonProcess = spawn('python',["/home/pi/github/little_pulse/little_pulse/code/pulse_sensor/pulseWriter.py"]);
            
            pythonProcess.stdout.on('data', function(data){
                console.log('stdout:' + data);
            });
            
        };

        if (! pythonProcess2)
        {
            pythonProcess2 = spawn('python',["/home/pi/grove.py/grove/grove_gsr_sensor.py"]);
         
        };
        
    };

function stopLogging()
{ 

		
		if(!! pythonProcess)
        {
            pythonProcess.kill();
            pythonProcess == null;
        }

        if(!! pythonProcess2)
        {
            pythonProcess2.kill();
            pythonProcess2 == null;
        }


}

function DeleteFiles()
{
    if (! pythonProcess)
        {
            pythonProcess = spawn('python',["/home/pi/github/little_pulse/little_pulse/code/pulse_sensor/DeleteFile.py"]);
            
            
        };

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
isLogging : isLogging,
DeleteFiles : DeleteFiles};


