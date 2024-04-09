// This is /api/subscribe.js

export default (req, res) => {
    if (req.method === 'POST') {
        // Assuming you're sending data as JSON
        const { email } = req.body;
        
        // Here you would typically add the email to your database or email list
        console.log(`Received subscription request from: ${email}`);

        // Responding to the client
        res.status(200).json({ success: true, message: 'Subscription successful!' });
    } else {
        // Handle any non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
