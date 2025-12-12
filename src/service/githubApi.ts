import type { } from 'react-toastify'

export interface Repo {
  id: number;
  name: string;
  description: string | null;
  homepage: string | null;
  is_template: boolean;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
}

export interface UserInfo {
  bio: string | null;
  blog: string | null;
  company: string | null;
  followers: number;
  public_repos: number;
  repos_url: string;
  twitter_username: string | null;
}

export async function safeFetchJson<T = any>(input: string | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init)
  if (!res.ok) {
    let errorMsg = `HTTP ${res.status}: ${res.statusText}`
    try {
      const data = await res.json()
      if (data && data.message) errorMsg = data.message
    } catch {}
    throw new Error(errorMsg)
  }
  return res.json() as Promise<T>
}

export function formatRepositories(repositories: any[]): Repo[] {
  return repositories.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    homepage: item.homepage,
    is_template: item.is_template,
    language: item.language,
    stargazers_count: item.stargazers_count,
    topics: item.topics,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }))
}

export async function fetchUserInfo(username: string): Promise<UserInfo> {
  const url = `https://api.github.com/users/${username}`
  return safeFetchJson<UserInfo>(url)
}

export async function fetchUserRepos(reposUrl: string): Promise<Repo[]> {
  const data = await safeFetchJson<any[]>(reposUrl)
  return formatRepositories(data)
}
