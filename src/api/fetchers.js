
//src/api/fetcher.js
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

const GITHUB_USERNAME = 'gaurisankartarasia'; 
const GITHUB_REPO_NAME = 'hackneyed';   
const GITHUB_REPO_BRANCH = 'main';               
const GITHUB_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/${GITHUB_REPO_BRANCH}`;

/**
 * fetches the main list of ROMs/devices from github.
 * @returns {Promise<Array<object>>}
 */
export const fetchRomsList = async () => {
  const githubUrl = `${GITHUB_BASE_URL}/devices/roms.json`;
  return fetchJson(githubUrl, true, []);
};

/**
 * fetches the specific build list for a device codename from github.
 * @param {string} codename
 * @returns {Promise<Array<object>>}
 */
export const fetchRomBuildsForCodename = async (codename) => {
  if (!codename) return [];
  const githubUrl = `${GITHUB_BASE_URL}/devices/builds/${codename}.json`;
  return fetchJson(githubUrl, true, []);
};

/**
 * fetches group configuration data from github.
 * @returns {Promise<object>}
 */
export const fetchGroupsConfig = async () => {
  const githubUrl = `${GITHUB_BASE_URL}/config/groups.json`;
  // const githubUrl = `/config/groups.json`;

  return fetchJson(githubUrl, true, {});
};

/**
 * fetches personal configuration data from GitHub.
 * @returns {Promise<object>}
 */
export const fetchMeConfig = async () => {
  const githubUrl = `${GITHUB_BASE_URL}/config/site_info.json`;
  // const githubUrl = `/config/site_info.json`;
  return fetchJson(githubUrl, true, {});
};
