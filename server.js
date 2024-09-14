require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const AZURE_OPENAI_KEY = process.env.AZURE_OPENAI_KEY;
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
const AZURE_OPENAI_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT;

app.post('/chat', async (req, res) => {
    try {
      console.log('Received message:', req.body.message);
      
      const response = await axios.post(
        `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=2023-05-15`,
        {
          messages: [
            { role: "system", content: "You are a helpful wellness assistant. You want to ensure the user doesn't experience burnout and is supported with their current endevour" },
            { role: "user", content: req.body.message }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': AZURE_OPENAI_KEY
          }
        }
      );
      
      console.log('OpenAI response:', response.data);
      
      if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
        res.json({ reply: response.data.choices[0].message.content });
      } else {
        console.error('Unexpected API response structure:', response.data);
        res.status(500).json({ error: 'Unexpected API response structure' });
      }
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'An error occurred', details: error.message });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));