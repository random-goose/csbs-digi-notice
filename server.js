const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, callback) => {
        callback(null, 'image_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Allow CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.options('*', (req, res) => {
    // Pre-flight request response
    res.sendStatus(200);
});

app.post('/upload', upload.single('image'), (req, res) => {
    const filePath = req.file.path.replace('public', ''); // Adjust path as needed
    res.json({ filePath: filePath });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
