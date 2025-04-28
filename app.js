const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const publicPath = path.resolve(__dirname, 'assets');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

    app.post("/contact", async (req, res) => {
        const { nombre, email, telefono, asunto, mensaje } = req.body;
    
        try {
        const transporter = nodemailer.createTransport({
            service: "gmail", 
            auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
            },
        });
    
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: "Mensaje desde tu portafolio",
            text: `Nombre: ${nombre}\nEmail: ${email}\nTelefono:\n${telefono}\nAsunto:\n${asunto}\nMensaje:\n${mensaje}`,
        };
    
        // Envío del correo
        await transporter.sendMail(mailOptions);
    
        res.status(200).json({ success: true, message: "Mensaje enviado con éxito" });
        } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).json({ success: false, message: "Error al enviar el mensaje", error: error.toString() });
        }
    });

app.use(express.static(publicPath));
const port = process.env.PORT || 3000;
app.listen(port, (error) => {
    if (error) {
        return console.log(error)
    }
    console.log('server UUUUP')
});


app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, './index.html'))
});

app.get('/contact', function (req, res) {
    res.sendFile(path.resolve(__dirname, './gracias.html'))
});


