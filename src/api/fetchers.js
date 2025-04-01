
// src/api/fetchers.js

/**
 * https://github.com/gaurisankartarasia/hackneyed/tree/main/public
 * https://raw.githubusercontent.com/gaurisankartarasia/hackneyed/refs/heads/main/public/rom-builds/larry.json
 * https://raw.githubusercontent.com/Vivekachooz/hackneyed/refs/heads/main/public/roms.json?token=GHSAT0AAAAAADASKNE2WXX7N6JMNUSN5666Z7LSN3Q
 * Generic JSON fetcher that throws for non-ok statuses
 * and handles 404s specifically by returning a default value.
 */


  const fetchJson = async (url, isGithubUrl = false, notFoundValue = null) => {
    console.log(`[RQ Fetcher] Attempting fetch: ${url} (GitHub URL: ${isGithubUrl})`); 

    const headers = {};
  

    const response = await fetch(url, { headers });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`[RQ Fetcher] 404 Not Found for ${url}. Returning default value.`);
        return notFoundValue; // Return specified default on 404
      }
      // Throw for other errors
      const errorText = await response.text().catch(() => `Status ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText} for ${url}`);
    }

    return response.json();
  };

  // --- Configuration for your GitHub Repository ---
  const GITHUB_USERNAME = 'gaurisankartarasia'; // Replace with your GitHub username
  const GITHUB_REPO_NAME = 'hackneyed';   // Replace with your repository name
  const GITHUB_REPO_BRANCH = 'main';               // Replace with your main branch name (e.g., main, master)
  // const GITHUB_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/${GITHUB_REPO_BRANCH}`;
  const GITHUB_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/refs/heads/${GITHUB_REPO_BRANCH}`
  /**
   * Fetches the main list of ROMs/devices from GitHub.
   * @returns {Promise<Array<object>>}
   */
  export const fetchRomsList = async () => {
    const githubUrl = `${GITHUB_BASE_URL}/devices/roms.json`;
    const data = await fetchJson(githubUrl, true, []); 
    return data || []; // Ensure it's always an array
  };

  /**
   * Fetches the specific build list for a device codename from GitHub.
   * @param {string} codename
   * @returns {Promise<Array<object>>}
   */
  export const fetchRomBuildsForCodename = async (codename) => {
    if (!codename) return []; // Don't fetch if codename is missing
    const githubUrl = `${GITHUB_BASE_URL}/devices/builds/${codename}.json`; // Adjust the path
    const data = await fetchJson(githubUrl, true, []); // Indicate it's a GitHub URL
    return data || []; // Ensure it's always an array
  };