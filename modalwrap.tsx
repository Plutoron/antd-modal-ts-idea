import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Modal, {ModalProps, ModalFuncProps} from './modal'
import confirm from './confirm'

import './modal.styl'

export type ModalFunc = (
  props: ModalFuncProps
) => {
  destroy: () => void,
  update: (newConfig: ModalProps) => void
}

export const destroyFns: Array<() => void> = []

export class ModalWrap extends React.Component<ModalProps, {}> {
  static info: ModalFunc
  static success: ModalFunc
  static error: ModalFunc
  static warn: ModalFunc
  static warning: ModalFunc
  static confirm: ModalFunc
  static destroyAll: () => void

  hasDestory!: boolean
  wrap!: HTMLDivElement
  
  constructor(props: ModalProps) {
    super(props)
  }

  removeWrap = () => {
    ReactDOM.unmountComponentAtNode(this.wrap)
    document.body.removeChild(this.wrap)
    this.hasDestory = true
  }

  renderWrap = () => {
    ReactDOM.render(<Modal {...this.props} removeWrap={this.removeWrap} />, this.wrap)
  }

  componentDidMount() {
    this.wrap = document.createElement('div')
    document.body.appendChild(this.wrap)
    this.renderWrap()
  }

  componentDidUpdate(props: ModalProps) {
    if (this.hasDestory) {
      this.wrap = document.createElement('div')
      document.body.appendChild(this.wrap)
      this.hasDestory = false
    }
    this.renderWrap()
  }

  componentWillUnmount() {
    this.removeWrap()
  }
  
  render(){
    return null
  }
}
