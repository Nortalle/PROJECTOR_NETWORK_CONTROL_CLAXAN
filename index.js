// const util = require('util');
const axios = require('axios');
// const querystring = require('querystring');

const client = axios.create({
    baseURL: 'http://admin:0000@169.254.1.1',
    timeout: 5000,
});

// Power on
client.get('/protect/execPwr.cgi?PWRCHG=1');

// Power off
// client.get('/protect/execPwr.cgi?PWRCHG=2');

// Mute on
// client.get('/protect/execMute.cgi?MUTESEL=1');

// Mute off
// client.get('/protect/execMute.cgi?MUTESEL=0');

// Freeze On
// client.get('/protect/execFree.cgi?FREESEL=1');

// Freeze off
// client.get('/protect/execFree.cgi?FREESEL=0');

// Mode Normal
// client.get('/protect/execLamp.cgi?LAMPSEL=0');

// Mode Economic
// client.get('/protect/execLamp.cgi?LAMPSEL=1');

// Projection front
// client.get('/protect/execPJT.cgi?PJTIONSEL=0');

// Projection ceiling
// client.get('/protect/execPJT.cgi?PJTIONSEL=1');

// Projection rear
client.get('/protect/execPJT.cgi?PJTIONSEL=2');

// Projection rear-ceiling
// client.get('/protect/execPJT.cgi?PJTIONSEL=3');

/*
client.get('/protect/execFree.cgi')
.then(response => {
    debug('execFree : ' + util.inspect(response.data, false, null));
})

client.get('/protect/execPwr.cgi')
.then(response => {
    debug('execPwr : ' + util.inspect(response.data, false, null));
}) */

// Bright off
// client.get('/protect/execBrig.cgi?BRIG=-');
/*
const isDHCPActivated = '1';
const ipAddress = '169.254.1.1';
const subnetMask = '255.255.0.0';
const gateway = '192.168.1.1';
const DNSServer = '192.168.1.1';
const groupName = 'Group';
const projectorName = 'projector';

const params = {
    dhcpen: isDHCPActivated,
    ip: ipAddress,
    subnet: subnetMask,
    gw: gateway,
    dns1: DNSServer,
    group: groupName,
    host: projectorName,
};

// change name
client.post('/protect/network.htm', querystring.stringify(params))
    .then(() => {
        client.get('/protect/reboot.cgi')
            .then(() => {
                console.log('response2 ');
            }).catch(() => {
                console.log('error2 ');
            });

        console.log('response1 ');
    })
    .catch((error) => {
        console.log(`error1 ${util.inspect(error.response, false, null)}`);
    });
*/
