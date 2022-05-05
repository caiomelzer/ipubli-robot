require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cron = require("node-cron");
const axios = require("axios");
var fs = require('fs');

cron.schedule("5 * * * * *", () => {
    const optionsUsername = {
        method: 'GET',
        url: 'http://localhost:4000/api/v1/utils/instagram/',
        headers: {}
      };
      axios.request(optionsUsername).then(function (responseUsername) {
        console.log('chamendo', responseUsername.data.username)
        let options = {
            method: 'GET',
            url: 'http://localhost:4000/api/v1/utils/instagram/'+responseUsername.data.username,
            headers: {}
        };
        axios.request(options).then(function (response) {
            let optionsUpdateUser = {
                method: 'PUT',
                url: 'http://localhost:4000/api/v1/utils/instagram/'+responseUsername.data.username,
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
