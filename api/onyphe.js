const fetch = require('node-fetch');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { ip } = req.query;
    if (!ip) return res.status(400).json({ error: 'IP parameter required' });
    
    const apiKey = process.env.ONYPHE_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'ONYPHE API key not configured on server' });

    try {
        const response = await fetch(`https://www.onyphe.io/api/v2/simple/geoloc/${ip}`, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch from ONYPHE' });
    }
};
