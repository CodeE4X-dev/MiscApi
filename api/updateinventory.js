let players = global.players || {};
global.players = players;

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { username, userId, data } = req.body;
  if (!username || !data) return res.status(400).json({ error: 'Invalid data' });

  players[username.toLowerCase()] = {
    userId,
    data,
    lastSeen: Date.now()
  };

  return res.status(200).json({ success: true });
}
