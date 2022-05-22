require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cron = require("node-cron");
const axios = require("axios");
var fs = require('fs');
const { server } = require('./config');



cron.schedule("*/15 * * * * *", () => {
    const optionsUsername = {
        method: 'GET',
        url: server.url+'/api/v1/utils/instagram/',
        headers: {}
      };
      
      axios.request(optionsUsername).then(function (responseUsername) {
        console.log('Calling Instragram Profile', responseUsername.data.updatedAt)
        var updatedAt = new Date(responseUsername.data.updatedAt);   
            var today = new Date(Date.now());
            today = today.setDate(today.getDate() - 30);
            console.log(updatedAt , today)
            if(updatedAt < today){
                console.log('chamar')
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
                        console.log('chamando', responseUsername.data.username)
                    }).catch(function (error) {
                        console.log(error)
                    });
                }).catch(function (error) {
                    console.log(error)
                });
            }
            else{
                console.log('No updates needed')
            }

            
            
        
    }).catch(function (error) {
        console.log(error)
    });
});
