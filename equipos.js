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


var equipos = [
	0,0,0,0,0,0,0,0,0,0,0,0,0,0

]




const getEquipos = (request, response) => {
	pool.query('SELECT * FROM equipos equ LEFT JOIN zonas zon ON equ.zon_id = zon.zon_id ORDER BY equ_id ASC', (error, results) => {
		if (error) 
		{
			console.log(error);
			response.status(200).json(-1);
		}
		else
		{
			response.status(200).json(results);
		}
	})
};

const getVariables = (request, response) => {
	pool.query('SELECT * FROM variables ', (error, results) => {
		if (error) 
		{
			console.log(error);
			response.status(200).json(-1);
		}
		else
		{
			response.status(200).json(results);
		}
	})
};

const getEquipoId = (request, response) => {
	const id = parseInt(request.params.id);
	//pool.query('SELECT equ.*, zon_nombre FROM equipos equ LEFT JOIN zonas zon ON equ.zon_id = zon.zon_id WHERE equ.equ_id = $1', [id], (error, results) => {
	pool.query("SELECT equ.*, zon_nombre FROM equipos equ LEFT JOIN zonas zon ON equ.zon_id = zon.zon_id WHERE equ.equ_id = "+id, (error, results) => {
		if (error) 
		{
			console.log(error);
			response.status(200).json(-1);
		}
		else
		{
			response.status(200).json(results);
		}
	})
};


const newEquipo = (request, response) => {
	const { equ_nombre, zon_id } = request.body;
	//pool.query('INSERT INTO equipos (equ_nombre, zon_id) VALUES ($1, $2)', [equ_nombre, zon_id],  (error, results) => {
	pool.query("INSERT INTO equipos (equ_nombre, zon_id) VALUES ('"+equ_nombre+"', "+zon_id+")",  (error, results) => {
		if (error) 
		{
			console.log(error);
			response.status(201).json(-1);
		}
		else
		{
			response.status(201).json(1);
		}
	})
};


const editEquipo = (request, response) => {

	const id = parseInt(request.params.id);
	const { equ_nombre, zon_id } = request.body;
	
	//pool.query('UPDATE equipos SET equ_nombre=$1, zon_id=$2 WHERE equ_id = $3', [equ_nombre, zon_id, id],  (error, results) => {
	pool.query("UPDATE equipos SET equ_nombre='"+equ_nombre+"', zon_id="+zon_id+" WHERE equ_id = "+id, (error, results) => {
		if (error) 
		{
			console.log(error);
			response.status(200).json(-1);
		}
		else
		{
			response.status(200).json(1);
		}
	})
};

const delEquipoId = (request, response) => {
	
	const id = parseInt(request.params.id);

	//pool.query('DELETE FROM equipos WHERE equ_id = $1', [id], (error, results) => {
	pool.query("DELETE FROM equipos WHERE equ_id = "+id, (error, results) => {	
		if (error) 
		{
			console.log(error);
			response.status(200).json(-1);
		}
		else
		{
			response.status(200).json(1);
		}		
	})
};


const getGrafica = (request, response) => {
	const variable = parseInt(request.params.variable);
	const equipos = request.params.equipos;
	const filtro = request.params.filtro;

	var equiposA = equipos.split("-");

	var queryG = "";
	for(var i=0; i<equiposA.length; i++)
	{
		if(queryG != "")
			queryG = queryG + " UNION ";
		queryG = queryG + "SELECT var.var_nombre, eqm.equ_id, equ.equ_color, equ_nombre, eqm_valor, TIME(eqm_creado) AS eqm_creado FROM equipo"+equiposA[i]+"m10 eqm INNER JOIN variables var ON var.var_variable = eqm.eqm_variable INNER JOIN equipos equ ON equ.equ_id = eqm.equ_id WHERE var_id = "+variable+" AND DATE(eqm_creado) = '"+filtro+"'";
	}

	pool.query(queryG, (error, results) => {
		if (error)
		{
			console.log("Error: -10");
		}
		else
		{
			response.status(200).json(results)
			
		}
	})
};


module.exports = {
	getEquipos,
	getVariables,
	getEquipoId,
	newEquipo,
	editEquipo,
	delEquipoId,
	getGrafica
}

