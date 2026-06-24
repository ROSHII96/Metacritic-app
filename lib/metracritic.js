async function fetchWithTimeout(url, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("La solicitud tardó demasiado en responder");
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getLatestGames() {
  const LATEST_GAMES = "https://www.freetogame.com/api/games";

  const rawData = await fetchWithTimeout(LATEST_GAMES);

  if (!rawData.ok) {
    throw new Error(`La API respondió con error ${rawData.status}`);
  }

  const json = await rawData.json();

  if (!Array.isArray(json)) {
    throw new Error("La API no devolvió una lista válida de juegos");
  }

  return json.map((game) => ({
    description: game.short_description,
    releaseDate: game.release_date,
    slug: String(game.id),
    title: game.title,
    image: game.thumbnail,
    genre: game.genre,
    platform: game.platform,
    publisher: game.publisher,
    developer: game.developer,
    gameUrl: game.game_url,
  }));
}

export async function getGameDetails(id) {
  const GAME_DETAILS = `https://www.freetogame.com/api/game?id=${id}`;

  const rawData = await fetchWithTimeout(GAME_DETAILS);

  if (!rawData.ok) {
    throw new Error(`La API respondió con error ${rawData.status}`);
  }

  const json = await rawData.json();

  return {
    img: json.thumbnail,
    title: json.title,
    slug: String(json.id),
    description: json.description || json.short_description,
    score: null,
    reviews: [],
    platform: json.platform,
    genre: json.genre,
    publisher: json.publisher,
    developer: json.developer,
    gameUrl: json.game_url,
  };
}
