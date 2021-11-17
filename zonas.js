/*const Pool = require('pg').Pool
const pool = new Pool({
	user: 'seltek_user',
	host: 'seltekdb.c2ni2yxsqdjt.us-east-2.rds.amazonaws.com',
	database: 'seltek',
	password: '&kze^*bRVC1DqdbJg2lnLJFN1',
	port: 5432,
});*/

var mysql = require('mysql');

var pool = mysql.createConnection({
	host: "162.241.74.187",
	user: 'seltek_carmelita_user',
	password: '3Ms1ZjBeR*e6GIXRg*LVMQihtJbYa',
	database : 'seltek_carmelita'
});


pool.connect(function(err) {
	if (err)
	{
		console.log(err);
	}
	else
	{
		console.log("Conectado");
	}
});


const getZonas = (request, response) => {
	//pool.query('SELECT * FROM zonas ORDER BY zon_id ASC', (error, results) => {
	pool.query('SELECT * FROM zonas ORDER BY zon_id ASC', (error, results) => {
	if (error) {
		throw error
	}
	response.status(200).json(results)
	})
};

const getZonaId = (request, response) => {
	
	const id = parseInt(request.params.id);
	//pool.query('SELECT * FROM zonas WHERE zon_id = $1', [id], (error, results) => {
	pool.query("SELECT * FROM zonas WHERE zon_id = "+id, (error, results) => {
	if (error) {
		throw error
	}
	response.status(200).json(results)
	})
};


const newZona = (request, response) => {
	const { zon_nombre } = request.body;
	//pool.query('INSERT INTO zonas (zon_nombre) VALUES ($1) RETURNING zon_id', [zon_nombre],  (error, results) => {
	pool.query("INSERT INTO zonas (zon_nombre) VALUES ('"+zon_nombre+"')",  (error, results) => {
	if (error) {
		throw error
	}
	response.status(201).json(1)
	})
};


const editZona = (request, response) => {

	const id = parseInt(request.params.id);
	const { zon_nombre } = request.body;
	//pool.query('UPDATE zonas SET zon_nombre=$1 WHERE zon_id = $6', [zon_nombre, id],  (error, results) => {
	pool.query("UPDATE zonas SET zon_nombre='"+zon_nombre+"' WHERE zon_id = "+id, (error, results) => {
	if (error) {
		throw error
	}
	response.status(200).json(`User modified with ID: ${id}`)
	})
};

const delZonaId = (request, response) => {
	
	const id = parseInt(request.params.id);

	pool.query("DELETE FROM zonas WHERE zon_id = "+id, (error, results) => {
	if (error) {
		throw error
	}
	response.status(200).json(`User deleted with ID: ${id}`)
	})
};


module.exports = {
	getZonas,
	getZonaId,
	newZona,
	editZona,
	delZonaId
}

