export async function getStarCount(userName: string, repoName: string) {
    try {
        const response = await fetch(`https://api.github.com/repos/${userName}/${repoName}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const starCount = data.stargazers_count;

        return starCount;
    } catch (error) {
        console.error("Error fetching star count:", error);
        return 0; 
    }
}
