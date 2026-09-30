const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const app = express();
const PORT = process.env.PORT || 3000;

let qrCodeData = '';
let clientStatus = 'Iniciando sesión...';

// Inicializar cliente de WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    // Generar la imagen del código QR en formato data URL para mostrarlo en la web
    qrcode.toDataURL(qr, (err, url) => {
        if (err) {
            console.error('Error al generar el QR', err);
            return;
        }
        qrCodeData = url;
        clientStatus = 'Esperando escaneo de QR';
        console.log('¡Nuevo código QR generado! Escanéalo desde la web.');
    });
});

client.on('ready', () => {
    clientStatus = '¡WhatsApp conectado y listo!';
    qrCodeData = '';
    console.log('¡Cliente de WhatsApp conectado exitosamente!');
});

client.on('auth_failure', (msg) => {
    clientStatus = 'Error de autenticación: ' + msg;
    console.error('Error de autenticación', msg);
});

client.initialize();

// Ruta principal para ver el estado y el código QR en el navegador
app.get('/', (req, res) => {
    if (qrCodeData) {
        res.send(`
    
