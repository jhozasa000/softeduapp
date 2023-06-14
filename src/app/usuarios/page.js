"use client"; 
import { useEffect } from 'react'
import { useRouter} from 'next/navigation' 
// Here you would fetch and return the user
const useUser = () => ({ user: null, loading: false })
 
export default function Usuarios() {
  const { user, loading } = useUser()
  const router = useRouter()
 
  useEffect(() => {
    if (!(user || loading)) {
      router.push('/')
    }
  }, [user, loading])
 
  return <p>Redirecting...</p>
}