'use strict';

const request = require('superagent');
const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);

// no port given will dynamically set the port
server.listen();

server.on('listening', () => {
    console.log(`Newegg_Deals is Listening on port ${server.address().port} in ${service.get('env')}`);

    const announce = () => {
        request.put(`http://127.0.0.1:3000/service/time/${server.address().port}`, (err, res) => {
            if(err) {
                console.log(err);
                console.log("Error connecting to Iris");

                return;
            }

            console.log(res.body);
        });
    };

    announce();
    setInterval(announce, 15*1000);


});