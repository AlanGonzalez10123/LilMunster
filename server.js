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

// Simple cache
const responseCache = new Map();

// Fallback responses
const fallbackResponses = [
  "I'm here to support your well-being. Could you tell me more about how you're feeling?",
  "Remember, it's important to take breaks and practice self-care, especially when you're busy.",
  "Your health is a priority. How can I help you maintain balance in your daily routine?",
  "It sounds like you have a lot on your plate. Let's think about ways to manage stress effectively.",
  "Every small step towards wellness counts. What positive action can you take for yourself today?"
];

let fallbackIndex = 0;

app.post('/chat', async (req, res) => {
  try {
    console.log('Received message:', req.body.message);
    
    // Check cache first
    if (responseCache.has(req.body.message)) {
      console.log('Cache hit');
      return res.json({ reply: responseCache.get(req.body.message) });
    }

    const response = await axios.post(
      `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=2023-05-15`,
      {
        messages: [
          { role: "system", content: "You are a helpful wellness assistant. Provide concise responses." },
          { role: "user", content: req.body.message }
        ],
        max_tokens: 100,  // Limit the response length
        best_of: 1,       // Only generate one response
        temperature: 0.7  // Adjust for desired creativity vs consistency
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
      const reply = response.data.choices[0].message.content;
      // Cache the response
      responseCache.set(req.body.message, reply);
      res.json({ reply: reply });
    } else {
      console.error('Unexpected API response structure:', response.data);
      res.status(500).json({ error: 'Unexpected API response structure' });
    }
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    if (error.response && error.response.status === 429) {
      // Use fallback response when rate limited
      const fallbackReply = fallbackResponses[fallbackIndex];
      fallbackIndex = (fallbackIndex + 1) % fallbackResponses.length;
      res.json({ reply: `[AI Fallback] ${fallbackReply}` });
    } else {
      res.status(500).json({ error: 'An error occurred', details: error.message });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));