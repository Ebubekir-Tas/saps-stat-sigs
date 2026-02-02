function calculateRank(kills) {
  const thresholds = [
    5, 25, 100, 300, 500, 750, 1250, 2000,
    3000, 5000, 10000, 12500, 15000, 20000, 25500
  ];

  let rank = 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (kills >= thresholds[i]) rank = i + 1;
    else break;
  }
  return rank;
}

function calculateRating(kd, rank) {
  let rating = "Rating: ";
  kd = parseFloat(kd);

  if (kd < 0.15) rating += "D";
  else if (kd < 0.3) rating += "D+";
  else if (kd < 0.4) rating += "C-";
  else if (kd < 0.55) rating += "C";
  else if (kd < 0.7) rating += "C+";
  else if (kd < 0.85) rating += "B-";
  else if (kd < 1) rating += "B";
  else if (kd < 1.3) rating += "B+";
  else if (kd < 1.7) rating += "A-";
  else if (kd < 2) rating += "A";
  else if ((kd < 3 && rank >= 7) || (kd >= 2 && rank < 7)) rating += "A+";
  else if ((kd < 5 && rank >= 7) || (kd >= 5 && rank === 7)) rating += "A++";
  else if (kd >= 5 && rank >= 8) rating += "A+++";

  return rating;
}

async function getHighscores(username) {
  try {
    const res = await fetch(
      "https://playstickarena.com/stick_arena.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          action: "highscore_rank",
          username
        })
      }
    );

    const text = await res.text();

    const params = new URLSearchParams(text);

    if (params.get("result") === "success") {
      const rank = params.get("rank");
      return rank !== null ? parseInt(rank, 10) : null;
    }

    return null;
  } catch (err) {
    console.error("getHighscores failed", err);
    return null;
  }
}
