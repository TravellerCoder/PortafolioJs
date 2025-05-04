console.log("Iniciando el servidor...");



// --- Carga dotenv primero ---
require('dotenv').config();

// --- Imports ---
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// --- Inicializar app ---
const app = express();

// --- Configuración básica ---
const publicPath = path.resolve(__dirname, 'assets');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

// --- Rutas principales ---

// Página principal
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'));
});

// Página de gracias
app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, './gracias.html'));
});

// --- Endpoint de formulario ---
app.post("/contact", async (req, res) => {
    const { nombre, email, telefono, asunto, mensaje } = req.body;

    console.log("Formulario recibido:", req.body);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS existe:", process.env.EMAIL_PASS ? "Sí" : "No");

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        console.log("Transporter creado correctamente");

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: "Mensaje desde tu portafolio",
            text: `Nombre: ${nombre}\nEmail: ${email}\nTelefono: ${telefono}\nAsunto: ${asunto}\nMensaje:\n${mensaje}`,
        };

        console.log("Opciones de mail preparadas:", mailOptions);

        const info = await transporter.sendMail(mailOptions);

        console.log("Correo enviado exitosamente:", info);

        res.redirect('./gracias.html')
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error al enviar el mensaje", 
            error: error.toString() 
        });
    }
});

// --- Puerto ---
const port = process.env.PORT || 3000;
app.listen(port, (error) => {
    if (error) {
        return console.log("Error al levantar el servidor:", error);
    }
    console.log(`Servidor funcionando en puerto ${port}`);
});
