'use strict' //berguna sebagai peraturan ketat pada javascript yaitu variable yang belum di declare tidak bisa digunakan

const Hapi = require('hapi');
const Request = require('request');
const Vision = require('vision');
const Handlebars = require('handlebars');    //konstanta berisi paket atau engine yang telah diinstal dan tidak dapat diubah 
const LodashFilter = require('lodash.filter');
const LodashTake = require('lodash.take');
const server = new Hapi.Server();
 
server.connection({
    host: '127.0.0.1',   //file server terkoneksi pada local host dan  port 3000 (default port dari javascript)
    port: 3000
});
 
// server register meregister apa saja yang bisa ditampilkan server.views berisi engine handlebars 
server.register(Vision, (err) => {
    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        path: './views',  //ditujukan kedalam folder views 
    });
});
 
server.start((err) => {
    if (err) {
        throw err;
    }
 
    console.log(`Server running at: ${server.info.uri}`);
	
});
//request data diambil dari api myjson yang telah dibuat,data yang ditampilkan berdasarkan data indeks di myjson
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        Request.get('https://api.myjson.com/bins/191q7r/', function (error, response, body) {
            if (error) {
                throw error;
            }
 //data konstanta mengurai data yang telah dan tidak dapat diubah lalu data dipecah memjadi beberapa bagian dalam result
            const data = JSON.parse(body); 
			//console.log("tes %j", data);
			var result1, result2, result3, result4;
            reply.view('index', { result: data.mahasiswa[0], result1 : data.mahasiswa[1], result2: data.mahasiswa[2], result3: data.mahasiswa[3], result4: data.mahasiswa[4] });
			
        });
    }
});
 
server.route({
    method: 'GET',
    path: '/matakuliah/',
    handler: function (request, reply) {
        Request.get('https://api.myjson.com/bins/r75hz', function (error, response, body) {
            if (error) {
                throw error;
            }
 
            const data = JSON.parse(body);
			//console.log("tes %j", data);
			var result1, result2, result3, result4;
            reply.view('matakuliah', { result: data.mata_kuliah[0], result1 : data.mata_kuliah[1], result2: data.mata_kuliah[2], result3: data.mata_kuliah[3], result4: data.mata_kuliah[4] });
			
        });
    }
});

server.route({
    method: 'GET',
    path: '/krs/',
    handler: function (request, reply) {
        Request.get('https://api.myjson.com/bins/1cs4y7', function (error, response, body) {
            if (error) {
                throw error;
            }
 
            const data = JSON.parse(body);
			//console.log("tes %j", data);
			var result1, result2, result3, result4;
            reply.view('krs', { result: data.krs[0] });
			
        });
    }
});