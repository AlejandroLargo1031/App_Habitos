// app/hooks/useHabits.ts
import { useQuery } from '@tanstack/react-query'

const fetchHabits = async () => {
  const res = await fetch('/api/habits')
  if (!res.ok) throw new Error('Error fetching habits')
  return res.json()
}

export function useHabits() {
  return useQuery({
    queryKey: ['habits'],
    queryFn: fetchHabits,
  })
}