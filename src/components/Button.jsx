
import Styles from "./Button.module.css"

export default function Button({children, onClick, type}) {
  return (
    <button onClick={onClick} className={`${Styles.btn} ${Styles[type]}`} >
        {children}
    </button>
  )
}
