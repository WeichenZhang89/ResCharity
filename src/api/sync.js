require('dotenv').config();
const { WebSocketMongoSync } = require('resilient-node-cache');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Express app setup
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'multipart/form-data']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer configuration
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
        files: 10
    }
}).array('files', 10);

// MongoDB sync configuration
const mongoConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017' || 'mongodb://localhost:27017' ,
  dbName: 'myDatabase',
  collectionName: 'myCollection',
};

const resilientDBConfig = {
    baseUrl: 'resilientdb://crow.resilientdb.com',
    httpSecure: true,
    wsSecure: true,
};

// Initialize WebSocket sync
const sync = new WebSocketMongoSync(mongoConfig, resilientDBConfig);

sync.on('connected', () => {
    console.log('WebSocket connected.');
});

sync.on('data', (newBlocks) => {
    console.log('Received new blocks:', newBlocks);
});

sync.on('error', (error) => {
    console.error('Error:', error);
});

sync.on('closed', () => {
    console.log('Connection closed.');
});

// Email endpoint
app.post('/send-email', async (req, res) => {
    console.log('Received request');

    upload(req, res, async function(err) {
        console.log('Processing upload');

        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            return res.status(400).send(`Upload error: ${err.message}`);
        } else if (err) {
            console.error('Unknown error:', err);
            return res.status(500).send(`Unknown error: ${err.message}`);
        }

        console.log('Files:', req.files);
        console.log('Body:', req.body);

        const { name, email, subject, phone, message } = req.body;
        const files = req.files;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const htmlContent = `
            <h2>New Charity Project Submission</h2>
            <p><strong>Full Name:</strong> ${name || 'Not provided'}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject || 'Not provided'}</p>
            <p><strong>Message:</strong></p>
            <p>${message || 'No message provided'}</p>
            ${files && files.length > 0 ? '<p><strong>Attachments:</strong> ' + files.length + ' file(s)</p>' : ''}
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Charity Project: ${subject || 'New Contact'}`,
            html: htmlContent,
            text: htmlContent.replace(/<[^>]*>/g, ''),
            attachments: files ? files.map(file => ({
                filename: file.originalname,
                path: file.path,
                contentType: file.mimetype
            })) : []
        };

        try {
            console.log('Sending email...');
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');

            if (files && files.length > 0) {
                files.forEach(file => {
                    if (fs.existsSync(file.path)) {
                        fs.unlinkSync(file.path);
                    }
                });
            }

            res.status(200).send('Email sent successfully!');
        } catch (error) {
            console.error('Email sending error:', error);
            
            if (files && files.length > 0) {
                files.forEach(file => {
                    if (fs.existsSync(file.path)) {
                        fs.unlinkSync(file.path);
                    }
                });
            }
            
            res.status(500).send(`Failed to send email: ${error.message}`);
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('Server is running');
});

// Start the server and initialize sync
const PORT = process.env.PORT || 3001;

(async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Upload directory: ${path.resolve(uploadDir)}`);
        });

        await sync.initialize();
        console.log('Synchronization initialized.');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
})();