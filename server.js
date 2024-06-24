import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const port = 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// Serves HTML file
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

// Start server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
});