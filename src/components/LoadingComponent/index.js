import React, { useContext, useEffect } from 'react'
import { appContext } from '../../helpers/context'

export default function LoadingComponent () {
  useEffect(() => {
    document.getElementById('bootSpinner').remove()
  })

  return (
    <div className="lds-root">
      <div className="lds-facebook">
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}
