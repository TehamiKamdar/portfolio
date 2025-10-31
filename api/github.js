export default async function handler(req, res) {
  const username = "TehamiKamdar";
  const token = process.env.GITHUB_TOKEN;

  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github.mercy-preview+json"
    }
  });

  const data = await response.json();
  res.status(200).json(data);
}
