let players = global.players || {};
global.players = players;

export default function handler(req, res) {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'Username required' });

  const player = players[username.toLowerCase()];
  if (!player || Date.now() - player.lastSeen > 30 * 1000) {
    return res.status(404).json({ error: 'Player not in-game or data expired' });
  }

  return res.status(200).json({ player: username, userId: player.userId, data: player.data });
}
