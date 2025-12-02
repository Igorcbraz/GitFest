import { useState, useEffect } from 'react'

interface GitHubStats {
  stars: number;
  forks: number;
  watchers: number;
  loading: boolean;
  error: string | null;
}

export const useGitHubStats = (owner: string, repo: string): GitHubStats => {
  const [stats, setStats] = useState<GitHubStats>({
    stars: 0,
    forks: 0,
    watchers: 0,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)

        if (!response.ok) {
          throw new Error('Failed to fetch repository stats')
        }

        const data = await response.json()

        setStats({
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0,
          watchers: data.subscribers_count || 0,
          loading: false,
          error: null,
        })
      } catch (error) {
        console.error('Error fetching GitHub stats:', error)
        setStats({
          stars: 3,
          forks: 0,
          watchers: 1,
          loading: false,
          error: 'Failed to fetch stats',
        })
      }
    }

    fetchStats()
  }, [owner, repo])

  return stats
}
