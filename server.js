require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cron = require("node-cron");
const axios = require("axios");
var fs = require('fs');
const { server } = require('./config');

cron.schedule("* * * * *", () => {
    const optionsUsername = {
        method: 'GET',
        url: server.url+'/api/v1/utils/instagram/',
        headers: {}
      };
      axios.request(optionsUsername).then(function (responseUsername) {
        console.log('chamendo', responseUsername.data.username)
        let options = {
            method: 'GET',
            url: server.url+'/api/v1/utils/instagram/'+responseUsername.data.username,
            headers: {}
        };
        axios.request(options).then(function (response) {
            let optionsUpdateUser = {
                method: 'PUT',
                url: server.url+'/api/v1/utils/instagram/'+responseUsername.data.username,
                headers: {}
            };
            axios.request(optionsUpdateUser).then(function (responseUsername) {
                console.log('chamendo', responseUsername.data.username)
            }).catch(function (error) {
                console.log(error)
            });
        }).catch(function (error) {
            console.log(error)
        });
    }).catch(function (error) {
        console.log(error)
    });
});
