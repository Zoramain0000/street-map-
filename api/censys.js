const fetch = require('node-fetch');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const apiId = process.env.CENSYS_API_ID;
    const apiSecret = process.env.CENSYS_API_SECRET;
    if (!apiId || !apiSecret) return res.status(500).json({ error: 'Censys API credentials not configured' });

    try {
        const response = await fetch('https://search.censys.io/api/v2/certificates/search?q=*&per_page=5', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${apiId}:${apiSecret}`).toString('base64')
            }
        });
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch from Censys' });
    }
};
