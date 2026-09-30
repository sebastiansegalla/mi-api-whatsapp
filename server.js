const express = require('express');
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode');
const pino = require('pino');

const app = express();
app.use(express.json());

let qrHtml = '
