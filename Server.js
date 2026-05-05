const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
    const { prompt, module } = req.body;

    let result = '';

    if(module === 'lyric'){
        result = `🎵 Judul: ${prompt}

Verse:
Tentang ${prompt} yang hadir dalam relung hati,
malam sunyi menjadi saksi.

Chorus:
${prompt} tak pernah hilang dari rasa,
ku nyanyikan dalam irama cinta.`;
    }

    else if(module === 'suno'){
        result = `${prompt}, emotional indonesian pop ballad, cinematic atmosphere, studio vocal, high quality`;
    }

    else if(module === 'cover'){
        result = `AI Cover concept for ${prompt}: neon romantic modern artwork`;
    }

    else if(module === 'caption'){
        result = `🔥 Lagu terbaru bertema ${prompt} kini hadir. Siapkan hati untuk menikmati setiap liriknya. #lagubaru #viral`;
    }

    res.json({ output: result });
});

app.get('/', (req,res)=>{
   res.send('BEJU AI SERVER RUNNING');
});

app.listen(process.env.PORT || 3000, ()=>{
   console.log('Server running');
});
