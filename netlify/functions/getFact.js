// File: netlify/functions/getFact.js
exports.handler = async function (event) {
    const geminiApiKey = process.env.GEMINI_API_KEY; // Securely get key from Netlify environment
    const { prompt } = JSON.parse(event.body); // Get prompt from frontend request

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] })
        });
        if (!response.ok) {
            return { statusCode: response.status, body: await response.text() };
        }
        const data = await response.json();
        return { statusCode: 200, body: JSON.stringify(data) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
