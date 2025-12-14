import React from 'react'

const Button = ({styles, content, onclick}) => {

    const classNames = `px-3 rounded-sm  bg-primary-1 text-primary-2 cursor-pointer ring-lite-1 hover:bg-primary-2 hover:text-primary-1 ${styles}`;

  return (
    <button onClick={onclick} className={classNames}>{content}</button>
  )
}

export default Button