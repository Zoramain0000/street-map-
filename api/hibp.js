const fetch = require('node-fetch');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const apiKey = process.env.HIBP_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'HIBP API key not configured on server' });

    try {
        const response = await fetch('https://haveibeenpwned.com/api/v3/breaches', {
            headers: { 
                'hibp-api-key': apiKey,
                'user-agent': 'Zerodays-Leak-Discovery'
            }
        });
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch from HIBP' });
    }
};
