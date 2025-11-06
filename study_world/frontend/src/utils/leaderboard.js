// === Calculates a user's tier based on XP ===
export function calculateTier(user = {}) {
  const xp = user.xp ?? 0; // ensure xp is a number

  if (xp >= 5000) return "Gold";
  if (xp >= 2500) return "Silver";
  return "Bronze";
}

// === Calculates an overall leaderboard score ===
// Combines multiple factors for balanced ranking
export function calculateScore(user = {}) {
  const xp = user.xp ?? 0;
  const coins = user.coins ?? 0;
  const studyTime = user.studyTime ?? 0; // minutes
  const musicHours = user.musicHours ?? 0;
  const gamesPlayed = user.gamesPlayed ?? 0;

  // Weighted mix for overall "activity" score
  return (
    xp * 1.5 +          // XP = main progress
    coins * 0.3 +       // small coin bonus
    studyTime / 60 +    // 60 minutes = +1 point
    musicHours * 2 +    // listening bonus
    gamesPlayed * 5     // engagement bonus
  );
}

// === Sort users by their score (highest first) ===
export function sortUsersByScore(users = []) {
  return users
    .map((user) => ({
      ...user,
      score: calculateScore(user),
    }))
    .sort((a, b) => b.score - a.score);
}