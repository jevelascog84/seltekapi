const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const usuarios = require('./usuarios');
const zonas = require('./zonas');
const sensores = require('./sensores');
const equipos = require('./equipos');
const querystring = require('querystring');
const port = 3000

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration


app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)

app.get('/', (request, response) => {
	response.send("HOLA");
})

app.get('/usuarios', usuarios.getUsuarios);

app.get('/usuariosb/:busqueda,:pagina,:resultados,:orden', usuarios.getUsuariosBusqueda);

app.get('/usuario/:id', usuarios.getUsuarioId);
app.post('/usuario', usuarios.newUsuario);
app.get('/generar', usuarios.generarUsuarios);
app.put('/usuario/:id', usuarios.editUsuario);
app.delete('/usuario/:id', usuarios.delUsuarioId);


app.get('/login/:email,:password', usuarios.getLogin);
app.get('/loginToken/:token', usuarios.getLoginToken);

app.get('/roles', usuarios.getRoles);

app.get('/zonas', zonas.getZonas);
app.get('/zona/:id', zonas.getZonaId);
app.post('/zona', zonas.newZona);
app.put('/zona/:id', zonas.editZona);
app.delete('/zona/:id', zonas.delZonaId);

app.get('/equipos', equipos.getEquipos);
app.get('/variables', equipos.getVariables);
app.get('/equipo/:id', equipos.getEquipoId);
app.post('/equipo', equipos.newEquipo);
app.put('/equipo/:id', equipos.editEquipo);
app.delete('/equipo/:id', equipos.delEquipoId);
app.get('/grafica/:variable,:equipos,:filtro', equipos.getGrafica);



app.get('/sensores', sensores.getSensores);
app.get('/sensor/:id', sensores.getSensorId);
app.post('/sensor', sensores.newSensor);
app.put('/sensor/:id', sensores.editSensor);
app.delete('/sensor/:id', sensores.delSensorId);


app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})
