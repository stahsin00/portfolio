import localProjects from "../data/projects.json";

const GIST_URL = "https://gist.githubusercontent.com/stahsin00/4ed7801e802f801d0db1ae03552e6739/raw/projects.json";

export async function loadProjects() {
  try {
    const response = await fetch(GIST_URL);

    if (!response.ok) {
      throw new Error(`Failed to load projects: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn("Using local project data.", error);
    return localProjects;
  }
}