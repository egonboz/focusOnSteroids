export async function handler(event) {
  const API_KEY = process.env.VITE_YOUTUBE_API_KEY;
  const query = event.queryStringParameters.query;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing query parameter" }),
    };
  }

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data from YouTube API" }),
    };
  }
}
