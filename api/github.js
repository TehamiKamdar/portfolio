export default async function handler(req, res) {
  const username = "TehamiKamdar";
  const token = process.env.GITHUB_TOKEN;

  const headers = {
    "Authorization": `token ${token}`,
    "Accept": "application/vnd.github.mercy-preview+json"
  };

  const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
  const repos = await reposRes.json();

  // Fetch topics + languages for each repo
  const withDetails = await Promise.all(
    repos.map(async repo => {
      const topicsRes = await fetch(`${repo.url}/topics`, { headers });
      const topicsData = await topicsRes.json();

      const langsRes = await fetch(repo.languages_url, { headers });
      const langsData = await langsRes.json();

      return { ...repo, topics: topicsData.names || [], languages: langsData };
    })
  );

  res.status(200).json(withDetails);
}
