const API_BASE = '/api';

/**
 * Fetch complete portfolio data from backend REST API
 * Strictly returns live backend data or throws an error if backend is offline.
 */
export async function fetchPortfolio() {
  const res = await fetch(`${API_BASE}/portfolio`);
  if (!res.ok) {
    throw new Error(`Backend API error: HTTP ${res.status} (${res.statusText})`);
  }
  const json = await res.json();
  if (json.success && json.data) {
    return json.data;
  }
  throw new Error('Malformed portfolio payload from Backend API');
}

/**
 * Fetch developer profile from backend REST API
 */
export async function fetchProfile() {
  const res = await fetch(`${API_BASE}/portfolio/profile`);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const json = await res.json();
  return json.data;
}

/**
 * Fetch categorized technical skills from backend REST API
 */
export async function fetchSkills() {
  const res = await fetch(`${API_BASE}/portfolio/skills`);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const json = await res.json();
  return json.data;
}

/**
 * Fetch professional experience from backend REST API
 */
export async function fetchExperience() {
  const res = await fetch(`${API_BASE}/portfolio/experience`);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const json = await res.json();
  return json.data;
}

/**
 * Fetch enterprise projects from backend REST API
 */
export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/portfolio/projects`);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const json = await res.json();
  return json.data;
}

/**
 * Fetch architecture stages from backend REST API
 */
export async function fetchArchitecture() {
  const res = await fetch(`${API_BASE}/portfolio/architecture`);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const json = await res.json();
  return json.data;
}

/**
 * Fetch education and community leadership from backend REST API
 */
export async function fetchEducation() {
  const res = await fetch(`${API_BASE}/portfolio/education`);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const json = await res.json();
  return json.data;
}
