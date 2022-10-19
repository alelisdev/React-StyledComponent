import React from 'react'
import { Styles } from './style/closeBtnStyle'
import { ReactComponent as CloseIcon } from '../../../../../assets/img/user/close.svg';

const CloseButton = ({handleClose}) => {
  return (
    <Styles>
      <div 
          aria-label="delete"
          onClick={handleClose}
          className='close-button'
      >
        <CloseIcon />
      </div>
    </Styles>
  )
}
export default CloseButton
