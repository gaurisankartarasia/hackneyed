
// // src/api/fetchers.js

//   const fetchJson = async (url, isGithubUrl = false, notFoundValue = null) => {
//     console.log(`[RQ Fetcher] Attempting fetch: ${url} (GitHub URL: ${isGithubUrl})`); 

//     const headers = {};
  

//     const response = await fetch(url, { headers });

//     if (!response.ok) {
//       if (response.status === 404) {
//         console.warn(`[RQ Fetcher] 404 Not Found for ${url}. Returning default value.`);
//         return notFoundValue; // Return specified default on 404
//       }
//       // Throw for other errors
//       const errorText = await response.text().catch(() => `Status ${response.status}`);
//       throw new Error(`HTTP error! status: ${response.status} - ${errorText} for ${url}`);
//     }

//     return response.json();
//   };

//   // --- Configuration for GitHub Repository ---
//   const GITHUB_USERNAME = 'gaurisankartarasia'; // Replace with your GitHub username
//   const GITHUB_REPO_NAME = 'hackneyed';   // Replace with your repository name
//   const GITHUB_REPO_BRANCH = 'main';               // Replace with your main branch name (e.g., main, master)
//   const GITHUB_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/refs/heads/${GITHUB_REPO_BRANCH}`
//   /**
//    * Fetches the main list of ROMs/devices from GitHub.
//    * @returns {Promise<Array<object>>}
//    */
//   export const fetchRomsList = async () => {
//     const githubUrl = `${GITHUB_BASE_URL}/devices/roms.json`;
//     const data = await fetchJson(githubUrl, true, []); 
//     return data || []; 
//   };

//   /**
//    * Fetches the specific build list for a device codename from GitHub.
//    * @param {string} codename
//    * @returns {Promise<Array<object>>}
//    */

//   export const fetchRomBuildsForCodename = async (codename) => {
//     if (!codename) return []; 
//     const githubUrl = `${GITHUB_BASE_URL}/devices/builds/${codename}.json`; 
//     const data = await fetchJson(githubUrl, true, []); 
//     return data || []; 
//   };




//src/fetch/fetcher.js
const fetchJson = async (url, isGithubUrl = false, notFoundValue = null) => {
  console.log(`[RQ Fetcher] Attempting fetch: ${url} (GitHub URL: ${isGithubUrl})`);

  const headers = {};

  const response = await fetch(url, { headers });

  if (!response.ok) {
    if (response.status === 404) {
      console.warn(`[RQ Fetcher] 404 Not Found for ${url}. Returning default value.`);
      return notFoundValue;
    }
    const errorText = await response.text().catch(() => `Status ${response.status}`);
    throw new Error(`HTTP error! status: ${response.status} - ${errorText} for ${url}`);
  }

  return response.json();
};

// --- Configuration for GitHub Repository ---
const GITHUB_USERNAME = 'gaurisankartarasia'; 
const GITHUB_REPO_NAME = 'hackneyed';   
const GITHUB_REPO_BRANCH = 'main';               
const GITHUB_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/${GITHUB_REPO_BRANCH}`;

/**
 * Fetches the main list of ROMs/devices from GitHub.
 * @returns {Promise<Array<object>>}
 */
export const fetchRomsList = async () => {
  const githubUrl = `${GITHUB_BASE_URL}/devices/roms.json`;
  return fetchJson(githubUrl, true, []);
};

/**
 * Fetches the specific build list for a device codename from GitHub.
 * @param {string} codename
 * @returns {Promise<Array<object>>}
 */
export const fetchRomBuildsForCodename = async (codename) => {
  if (!codename) return [];
  const githubUrl = `${GITHUB_BASE_URL}/devices/builds/${codename}.json`;
  return fetchJson(githubUrl, true, []);
};

/**
 * Fetches group configuration data from GitHub.
 * @returns {Promise<object>}
 */
export const fetchGroupsConfig = async () => {
  const githubUrl = `${GITHUB_BASE_URL}/config/groups.json`;
  // const githubUrl = `/config/groups.json`;

  return fetchJson(githubUrl, true, {});
};

/**
 * Fetches personal configuration data from GitHub.
 * @returns {Promise<object>}
 */
export const fetchMeConfig = async () => {
  const githubUrl = `${GITHUB_BASE_URL}/config/site_info.json`;
  // const githubUrl = `/config/site_info.json`;
  return fetchJson(githubUrl, true, {});
};
