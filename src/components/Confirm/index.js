import { h, Component } from 'preact'
import { Link } from 'preact-router'
import theme from '../Theme/style.css'
import style from './style.css'
import {functionalSwitch, impurify} from '../utils'

const Capture = ({ image }) =>
  <div className={style.captures}>
    <img src={image} className={style.image} />
  </div>


const Previews = ({capture, nextLink, retakeAction, confirmAction} ) =>
  <div className={`${theme.previews} ${theme.step}`}>
    <h1 className={theme.title}>Confirm capture</h1>
    <p>Please confirm that you are happy with this photo.</p>
    <Capture image={capture.image} />
    <div className={`${theme.actions} ${style.actions}`}>
      <button
        onClick={retakeAction}
        className={`${theme.btn} ${style["btn-outline"]}`}
      >
        Take again
      </button>
      <a
        href={nextLink}
        className={`${theme.btn} ${theme["btn-primary"]}`}
        onClick={confirmAction}
      >
        Confirm
      </a>
    </div>
  </div>


const Confirm = ({
      nextLink,
      method,
      validCaptures,
      actions: {
        deleteCaptures,
        confirmCapture
      }
    }) => {

  const capture = validCaptures[method][0]

  return <Previews
    capture={capture}
    retakeAction={() => deleteCaptures({method})}
    confirmAction={() => confirmCapture({method, id: capture.id})}
    nextLink={nextLink}
  />
}

//TODO move to react instead of preact, since preact has issues handling pure components
//IF this component is exported as pure,
//some components like Camera will not have componentWillUnmount called
export default impurify(Confirm)