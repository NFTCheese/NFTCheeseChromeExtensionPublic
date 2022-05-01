/* global chrome */
import React, { useContext, useState, useEffect } from 'react'
import { getUser } from '../utils/api'

export const SUBSCRIBER_ROLES = ['SUBSCRIBER', 'MEMBER', 'ADMIN']
export const FOUNDER_ROLES = ['MEMBER', 'ADMIN']

export type User = {
  accessToken?: string
  isSubscriber: boolean
  isFounder: boolean
  role: 'FREE' | 'MEMBER' | 'SUBSCRIBER' | 'ADMIN'
  membershipType: 'FOUNDER' | 'LIFETIME' | 'EXTERNAL' | 'SUBSCRIPTION' | null
  publicAddress: string
}

const userContext = React.createContext<User | null>(null)
export const useUser = () => {
  return useContext(userContext)
}

export const getUserFromStorage = () => {
  return new Promise<(User & { accessToken: string }) | null>((resolve) => {
    if (chrome.runtime) {
      chrome.runtime.sendMessage({ method: 'getUser' }, (user) =>
        resolve(user),
      )
    } else {
      resolve(null);
    }
  })
}

export const UserProvider = ({
  children,
  allowNullUser = false,
  mockUser,
  loadFromBackgroundScript = false,
}: React.PropsWithChildren<{
  mockUser?: User
  allowNullUser?: boolean
  loadFromBackgroundScript?: boolean
}>) => {
  const { Provider } = userContext
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const user = await (() => {
          if (mockUser) {
            return new Promise<typeof mockUser>((resolve) =>
              setTimeout(() => resolve(mockUser), 250),
            )
          }
          if (loadFromBackgroundScript) {
            return getUserFromStorage();
          }
          return getUser()
        })();

        const role = user?.role || 'FREE'
        const membershipType = (user as User)?.membershipType || null

        setUser({
          isSubscriber: isSubscriber(role),
          isFounder: isFounder(role, membershipType),
          role,
          membershipType: membershipType,
          publicAddress: user?.publicAddress || '0x000',
        })
      } catch (err) {
        console.error(err);
      }
    })()
  }, [mockUser, loadFromBackgroundScript]);

  if (!user && !allowNullUser) return null

  return <Provider value={user}>{children}</Provider>
}

export const isSubscriber = (role: User['role']) =>
  Boolean(SUBSCRIBER_ROLES.includes(role))

export const isFounder = (
  role: User['role'],
  membershipType: User['membershipType'],
) => FOUNDER_ROLES.includes(role) && membershipType === 'FOUNDER'
