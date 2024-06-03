const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors()); // Add CORS middleware

app.post('/extract-links', async (req, res) => {
    const { url } = req.body;

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const links = [];
        const brokenLinks = [];
        const unbrokenLinks = [];
        const akaMsLinks = [];
        const hashLinks = [];

        $('#primaryArea a').each((index, element) => {
            const link = $(element).attr('href');
            if (link) {
                links.push(link);
                if (link.includes('#')) {
                    hashLinks.push(link);
                } else if (link.includes('aka.ms')) {
                    akaMsLinks.push(link);
                } else {
                    // Check if the link is broken or unbroken
                    axios.head(link)
                        .then(() => unbrokenLinks.push(link))
                        .catch(() => brokenLinks.push(link));
                }
            }
        });

        // Wait for all the promises to resolve
        await Promise.all(links.map(link => axios.head(link).catch(() => {})));

        res.json({ 
            allLinks: links, 
            hashLinks, 
            akaMsLinks, 
            brokenLinks, 
            unbrokenLinks 
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

