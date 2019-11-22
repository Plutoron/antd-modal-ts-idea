import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {ModalProps, ModalFuncProps} from './modal'
import {ModalWrap, ModalFunc, destroyFns} from './modalwrap'
import confirm from './confirm'

import './modal.styl'

import Info from './icons/tishi'
import Confirm from './icons/wenhao'
import Success from './icons/tijiao'
import Error from './icons/shibai'

export type ModalFunc = (
  props: ModalFuncProps
) => {
  destroy: () => void,
  update: (newConfig: ModalProps) => void
}

ModalWrap.info = (props: ModalFuncProps) => {
  const config = {
    type: 'info',
    icon: <Info fill="#1890ff" size="22" />,
    okCancel: true,
    ...props
  }
  return confirm(config)
}

ModalWrap.success = (props: ModalFuncProps) => {
  const config = {
    type: 'success',
    icon: <Success fill="#52c41a" size="22" />,
    okCancel: false,
    ...props
  }
  return confirm(config)
}

ModalWrap.error = (props: ModalFuncProps) => {
  const config = {
    type: 'error',
    icon: <Error  fill="#f5222d" size="22" />,
    okCancel: false,
    ...props
  }
  return confirm(config)
}

ModalWrap.warning = ModalWrap.warn = (props: ModalFuncProps) => {
  const config = {
    type: 'warning',
    icon: <Error fill="#faad14" size="22" />,
    okCancel: false,
    ...props
  }
  return confirm(config)
}

ModalWrap.confirm = (props: ModalFuncProps) => {
  const config = {
    type: 'confirm',
    icon: <Confirm fill="#faad14" size="22" />,
    okCancel: false,
    ...props
  }
  return confirm(config)
}

ModalWrap.destroyAll = () => {
  while (destroyFns.length) {
    const close = destroyFns.pop()
    if (close) {
      close()
    }
  }
}

export default ModalWrap
