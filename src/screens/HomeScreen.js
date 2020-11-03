import React, { useContext } from 'react'
import { appContext } from '../helpers/context'

export default function HomeScreen () {
  const { auth } = useContext(appContext)

  return (
    <div>
      <h1>Home Screen</h1>
      <h1>{ auth.user && auth.user.name}</h1>
    </div>
  )
}
