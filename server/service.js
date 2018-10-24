'use strict';

const express = require('express');
const service = express();
const request = require('request');
const cheerio = require('cheerio');

service.get('/service/:search_query', (req, res, next) => {
    // res.json({result: req.params.search_query});

    let objs = [];

    if (res.parameters.search_query.includes('daily')) {
        
    } 
    request('https://www.newegg.ca/DailyDeal.aspx?', (err, response, html) => {
        if(!err && response.statusCode == 200) {
            //console.log(html);
            const $ = cheerio.load(html);

            const containers = $('.item-container');

            

            containers.each((i, el) => {
                let obj_item = {};
                const item = $(el)
                .find('.item-info')
                .find('.item-title')
                .text(); 

                obj_item.name = item;
                objs.push(obj_item);
            });


            res.json({result: objs});
        }
    })
});


module.exports = service;