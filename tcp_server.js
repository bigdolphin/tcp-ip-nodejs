/* TCP/IP Server application
   Author: ltkhanh@bigdolphin.com.vn
   License: MIT
*/

// Asynchronous network API module
var net = require('net');
// File system module to store data
var fs = require('fs');

// Create Server
var server = net.createServer(function(socket) {
    // Log file
    var logfile = fs.createWriteStream('server.log',{flags: 'a'});

    // Callback function when there is error
    logfile.on('error', function(err) {
        // Print error to terminal
        console.log("Log file: ERROR: " + err);
    });

    // Forward received data to log file
    socket.pipe(logfile);

    // Callback function when data arrives
    socket.on('data', function(data){
        // Print raw data to terminal
        console.log(data);
        // Format data to UTF8 characters
        var textChunk = data.toString('utf8');
        // Print formatted data to terminal
        console.log(textChunk);
        // Respond to client
        socket.write("OK\r\n");
    });

    // Callback function when client disconnected
    socket.on('end', function() {
        console.log("Server: Client disconnected");        
    });

    // Callback function when there is error
    socket.on('error', function(err) {
        // Print error to terminal
        console.log("Server: ERROR: " + err);
    });
});
     
// Open port 2021
server.listen(2021, function() {
    // Print to terminal if success
    console.log("Server: listening !\r\n");
});
