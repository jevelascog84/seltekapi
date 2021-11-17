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


const getSensores = (request, response) => {
	pool.query('SELECT * FROM sensores sen LEFT JOIN equipos equ ON equ.equ_id = sen.equ_id ORDER BY sen_id ASC', (error, results) => {
	if (error) {
		throw error
	}
	response.status(200).json(results)
	})
};

const getSensorId = (request, response) => {
	
	const id = parseInt(request.params.id);
	//pool.query('SELECT sen.*, equ.equ_nombre FROM sensores sen LEFT JOIN equipos equ ON equ.equ_id = sen.equ_id WHERE sen.sen_id = $1', [id], (error, results) => {
	pool.query("SELECT sen.*, equ.equ_nombre FROM sensores sen LEFT JOIN equipos equ ON equ.equ_id = sen.equ_id WHERE sen.sen_id = "+id, (error, results) => {
	if (error) {
		throw error
	}
	response.status(200).json(results)
	})
};


const newSensor = (request, response) => {
	const { sen_nombre, sen_umedida, sen_ideal, sen_minimo, sen_maximo, equ_id } = request.body;
	//pool.query('INSERT INTO sensores (sen_nombre, sen_umedida, sen_ideal, sen_minimo, sen_maximo, equ_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING sen_id', [sen_nombre, sen_umedida, sen_ideal, sen_minimo, sen_maximo, equ_id],  (error, results) => {
	pool.query("INSERT INTO sensores (sen_nombre, sen_umedida, sen_ideal, sen_minimo, sen_maximo, equ_id) VALUES ('"+sen_nombre+"', '"+sen_umedida+"', "+sen_ideal+", "+sen_minimo+", "+sen_maximo+", "+equ_id+")", (error, results) => {
	if (error) {
		throw error
	}
	response.status(201).json(1)
	})
};


const editSensor = (request, response) => {

	const id = parseInt(request.params.id);
	const { sen_nombre, sen_umedida, sen_ideal, sen_minimo, sen_maximo, equ_id } = request.body;
	
	//pool.query('UPDATE sensores SET sen_nombre=$1, sen_umedida=$2, sen_ideal=$3, sen_minimo=$4, sen_maximo=$5, equ_id=$6 WHERE sen_id = $7', [sen_nombre, sen_umedida, sen_ideal, sen_minimo, sen_maximo, equ_id, id],  (error, results) => {
	pool.query("UPDATE sensores SET sen_nombre='"+sen_nombre+"', sen_umedida='"+sen_umedida+"', sen_ideal="+sen_ideal+", sen_minimo="+sen_minimo+", sen_maximo="+sen_maximo+", equ_id="+equ_id+" WHERE sen_id = "+id, (error, results) => {
	if (error) {
		throw error
	}
	response.status(200).json(`User modified with ID: ${id}`)
	})
};

const delSensorId = (request, response) => {
	const id = parseInt(request.params.id);
	//pool.query('DELETE FROM sensores WHERE sen_id = $1', [id], (error, results) => {
	pool.query("DELETE FROM sensores WHERE sen_id = "+id, (error, results) => {
	if (error) {
		throw error
	}
	response.status(200).json(`User deleted with ID: ${id}`)
	})
};


module.exports = {
	getSensores,
	getSensorId,
	newSensor,
	editSensor,
	delSensorId
}

