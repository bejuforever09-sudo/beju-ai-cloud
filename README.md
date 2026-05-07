const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Halaman utama
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Beju AI Cloud</title>
            <style>
                body { font-family: Arial; max-width: 600px; margin: 50px auto; padding: 20px; background: #1a1a2e; color: white; }
                h1 { color: #e94560; text-align: center; }
                input, select, button { width: 100%; padding: 12px; margin: 10px 0; border-radius: 8px; border: none; }
                button { background: #e94560; color: white; cursor: pointer; font-size: 16px; }
                button:hover { background: #ff6b6b; }
                #result { margin-top: 20px; padding: 15px; background: #16213e; border-radius: 8px; white-space: pre-line; }
            </style>
        </head>
        <body>
            <h1>🎵 Beju AI Generator</h1>
            <form id="generateForm">
                <input type="text" name="prompt" placeholder="Masukkan judul/topik..." required>
                <select name="module">
                    <option value="lyric">🎤 Lirik Lagu</option>
                </select>
                <button type="submit">Generate</button>
            </form>
            <div id="result"></div>
            
            <script>
                document.getElementById('generateForm').onsubmit = async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const res = await fetch('/generate', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            prompt: formData.get('prompt'),
                            module: formData.get('module')
                        })
                    });
                    const data = await res.json();
                    document.getElementById('result').innerText = data.result;
                };
            </script>
        </body>
        </html>
    `);
});

// API Generate
app.post('/generate', async (req, res) => {
    const { prompt, module } = req.body;
    let result = '';

    if (module === 'lyric') {
        result = `🎵 Judul: ${prompt}\n\nVerse:\nTentang ${prompt} yang hadir dalam relung hati,\nmalam sunyi menjadi saksi.\n\nChorus:\n${prompt}, oh ${prompt},\nbintang malam menyanyikan namamu.`;
    } else {
        result = `Hasil untuk: ${prompt}`;
    }

    res.json({ result });
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
