const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()); // Habilita el manejo de cookies
app.use(session({
    secret: 'clave_secreta', // Cambia esto por una clave más segura
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000, // 1 hora
        secure: false, // Si es true solo funciona con HTTPS
        httpOnly: false, // Si es true solo accesible desde el servidor
        sameSite: 'none', // Si es strict evita el envío en solicitudes de terceros
    } 
}));


// RUTAS
app.get('/set-cookie', (req, res)=>{
    try {

        const user_data = {
            name: 'Feliz Toribio',
            age: 69,
            nationality: 'Dominican',
        };
    
        const maxAge = 3600000; // 1 hora
    
        res.cookie('name_cookie', JSON.stringify(user_data), {
            maxAge: maxAge,
            httpOnly: true
        });

        res.send('Cookie creada y configurada correctamente');
    } catch (error) {
        console.error(`Error en /set-cookie: ${error}`);
    }
});

app.get('/get-cookie', (req, res)=>{
    const cookies = req.cookies;

    res.json(cookies.name_cookie);
});

app.get('/clear-cookie', (req, res)=>{
    const cookie_name = 'name_cookie';

    res.clearCookie(cookie_name);
    res.json({success: true, message: `Cookie ${cookie_name} ha sido eliminada correctamente.`});
});


app.get('/set-session', (req, res)=>{
    req.session.usuario = {id: 1, name: 'Usuario123'};
    res.json({success: true, message: `Sesión llamada "usuario" ha sido creada correctamente.`})
});

app.get('/get-session', (req, res)=>{
    if(req.session.usuario){
        res.json(req.session.usuario);
    } else{
        res.send('No hay datos de sesión');
    }
});

app.get('/destroy-session', (req, res)=>{
    req.session.destroy(err => {
        if(err){
            return res.status(500).send('Error al eliminar la sesión');
        }
        res.send('Sesión eliminada correctamente');
    });
})

// Configuración del puerto
const PORT = 3982;
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});