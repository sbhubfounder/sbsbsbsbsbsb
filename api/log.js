export default async function handler(req, res) {
  // Extract the visitor's IP address from standard proxy headers
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP';

  // Format the message for your Discord channel
  const payload = {
    content: `🚨 **New Visit Alert!**\nIP Address: \`${clientIp}\``
  };

  try {
    // Send the IP securely to your Discord webhook
    await fetch('https://discord.com/api/webhooks/1555345745723261110/LD1lWx8_CqQSyLJDQ8mcgsFRWJ8mGLjXiRk09LqMfwc9S8ZI1kxdWYnWN5RkS9rLU9EW', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending to Discord:', error);
    return res.status(500).json({ success: false });
  }
}
