# PROJECTOR NETWORK CONTROL - NodeJs

Vincent Guidoux 

## Introduction

While working on a project with a lot of projectors, I saw that some of them had an Ethernet Port, So I searched a way to control them using network

I use the **CLAXAN CL-ACC-18030N** and **CL-ACC-18030NH**.

![CL-ACC-18030NH](./pictures/claxan_cl_acc_18030NH.jpg)

I contacted the firm that produce this projector, but the software they gave me did not work well.

So I put the default URL(`169.254.1.1`) of the projector in a web Browser, and the result was promising :

![ProjectorNetworkControl](./pictures/ProjectorNetworkControl.JPG)

But, with this interface, we can only control one projector at a time, so I began my journey on analyzing the protocol to produce an app that can control more than one projector

## Authentication

For this model the credentials are :

username : admin

password : 0000

I used `axios`form `nodejs`

```javascript
const axios = require('axios');

const client = axios.create({
    baseURL: 'http://admin:0000@169.254.1.1',
    timeout: 2000,
});
```

## Basic Controls

All the controls have the same method to access the data and change it, they only need one API call. Let's take a look at some examples :

### Power

When we want to **check** if the power is on :

```javascript
client.get('/protect/execPwr.cgi')
.then(response => {
    console.log(response.data); // 0 if  the power is off, 1 if it's on
})
```

When we want to power the projector **on** :

```javascript
client.get('/protect/execPwr.cgi?PWRCHG=1');
```

When we want to power the projector **off** :

```javascript
client.get('/protect/execPwr.cgi?PWRCHG=2');
```

### Mute

When we want to **check** if the sound is muted :

```javascript
client.get('/protect/execMute.cgi')
.then(response => {
    console.log(response.data); // 1 if the sound is muted, 0 if not
})
```

When we want to **mute** the sound:

```javascript
client.get('/protect/execMute.cgi?MUTESEL=1');
```

When we want to **not mute** the sound:

```javascript
client.get('/protect/execMute.cgi?MUTESEL=0');
```

### Freeze

When we want to **check** if the screen is freezed (The image is static) :

```javascript
client.get('/protect/execFree.cgi')
.then(response => {
    console.log(response.data); // 1 if the screen is freezed, 0 if not
})
```

When we want to **freeze** the screen:

```javascript
client.get('/protect/execFree.cgi?FREESEL=1');
```

When we want to **unfreezed** the screen:

```javascript
client.get('/protect/execFree.cgi?FREESEL=0');
```

## Advanced Control

Here are some controls you need to reboot the manager so they took place and you can see the changes. 

- **dhcpen** : boolean if the projector accept or not DHCP
- **ip** : if *dhcpen* is false, we can set a default ip address
- **subnet** : if *dhcpen* is false, we can set a default subnet mask
- **gw ** : if *dhcpen* is false, we can set a default Gateway
- **dns1** : if *dhcpen* is false, we can set a default DNS Server
- **group **: We can specify a group for the projector, e.g. all the projector of the same level in a building could have the same group. 14 characters max.
- **host** : The name of the projector. 14 characters max

All these parameters can be changed at the same time, with a **POST** on `/protect/network.htm`, and to apply change, you need to reboot

```javascript
const querystring = require('querystring');

const params = { // There is no need to send a parameter if it doesn't change.
    dhcpen: '1',
    ip: '169.254.1.1',
    subnet: '255.255.0.0',
    gw: '192.168.1.1',
    dns1: '192.168.1.1',
    group: 'Group',
    host: 'Projector',
};

client.post('/protect/network.htm', querystring.stringify(params))
    .then(() => {
        client.get('/protect/reboot.cgi') //reboot
    })
```

The reboot has some issue,  it always wait for the timeout to goes off to apply.

