import { useQuery } from '@tanstack/react-query'
import { fetchUserInfo, fetchUserRepos, UserInfo, Repo } from '../service/githubApi'

export function useUserInfo(username: string | undefined) {
  return useQuery<UserInfo, Error>({
    queryKey: ['userInfo', username],
    queryFn: () => {
      if (!username) throw new Error('No username')
      return fetchUserInfo(username)
    },
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}

export function useUserRepos(reposUrl: string | undefined) {
  return useQuery<Repo[], Error>({
    queryKey: ['userRepos', reposUrl],
    queryFn: () => {
      if (!reposUrl) throw new Error('No reposUrl')
      return fetchUserRepos(reposUrl)
    },
    enabled: !!reposUrl,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}
