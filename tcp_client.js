/* TCP/IP Client application
   Author: ltkhanh@bigdolphin.com.vn
   License: MIT
*/

// Asynchronous network API module
var net = require('net');
// File system module to store data
var fs = require('fs');

// Create Client
var client = new net.Socket();

// Connect to server
client.connect(2021, 'localhost', function() {
    // Print to terminal if success
    console.log('Connected');

    // Create stream for log file    
    var logfile = fs.createWriteStream('client.log',{flags: 'a'});
    // Callback function when there is error
    logfile.on('error', function(err) {
        // Print error to terminal
        console.log("Log file: ERROR: " + err);
    });

    // Forward received data to log file
    client.pipe(logfile);

    // Send to Server
    client.write("Sent from client!");
});

// Callback function when data arrives
client.on('data', function(data) {
        // Print to terminal
	console.log('Received: ' + data);
	// Kill client after server's response
	client.destroy();
});

// Callback function when client disconnected
client.on('close', function() {
        // Print to terminal
	console.log('Connection closed');
});

