export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            console.log('Request received:', req.body);
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
            });

            const data = await response.json();
            console.log('Response from backend:', data);

            if (response.ok) {
                res.status(200).json(data);
            } else {
                res.status(response.status).json(data);
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
