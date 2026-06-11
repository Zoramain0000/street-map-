const fetch = require('node-fetch');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Search query (q) parameter required' });

    try {
        const response = await fetch(`https://api.github.com/search/code?q=${encodeURIComponent(q)}&per_page=5&sort=indexed`, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        });
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch from GitHub' });
    }
};
