let players = global.players || {};
global.players = players;

export default function handler(req, res) {
  const { username, userId, displayName } = req.query;

  const target = (username || displayName || userId || "").toLowerCase();

  if (!target) return res.status(400).json({ error: 'Username, userId, or displayName is required' });

  const player = Object.values(players).find(p =>
    (p.username && p.username.toLowerCase() === target) ||
    (p.displayName && p.displayName.toLowerCase() === target) ||
    (p.userId && String(p.userId) === target)
  );

  if (!player) {
    return res.status(404).json({ error: 'Player not found' });
  }

  return res.status(200).json({
    userId: player.userId,
    username: player.username,
    displayName: player.displayName,
    data: player.data
  });
}
