'use client'
import { useRef, useEffect } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import { rehydrateAuth } from '@/lib/features/auth/authSlice'

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  useEffect(() => {
    storeRef.current?.dispatch(rehydrateAuth())
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}
