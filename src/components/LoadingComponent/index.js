import { Backdrop, makeStyles } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { appContext } from '../../helpers/context'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

export default function LoadingComponent () {
  const classes = useStyles()
  const { layout } = useContext(appContext)

  useEffect(() => {
    const bootSpinner = document.getElementById('bootSpinner')
    if (bootSpinner) {
      bootSpinner.remove()
    }
  })

  return (
    <Backdrop className={classes.backdrop} open={layout.appLoading}>
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
    </Backdrop>
  )
}
