const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000; // Make sure this port is different from your CRA port

app.use(cors());

app.get('/proxy', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).send('URL is required');
  }

  try {
    // Dynamically import node-fetch
    const fetch = (await import('node-fetch')).default;

    const response = await fetch(imageUrl);
    const contentType = response.headers.get('content-type');
    res.setHeader('Content-Type', contentType);
    response.body.pipe(res);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Failed to fetch image');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
