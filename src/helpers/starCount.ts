export async function getStarCount(userName: string, repoName: string): Promise<number> {
    try {
      const response = await fetch(`https://api.github.com/repos/${userName}/${repoName}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json() as { stargazers_count: number };
  
      return data.stargazers_count;
    } catch (error) {
      console.error('Error fetching star count:', error);
      return 0;
    }
  }
