import * as React from 'react'
import * as ReactDOM from 'react-dom'
import getPrefixCls from 'NemoBase/getPrefixCls'

import Button from '@dtwave/nemo-button'

import Modal, { ModalFuncProps } from './Modal'
// import Button, { NativeButtonProps } from './button'
import {destroyFns} from './modalwrap'

import {classNames} from './util'

const prefixCls = getPrefixCls('modal-confirm')

interface ConfirmDialogProps {
  close: (...args: any[]) => void
  type: string
  // autoFocusButton?: null | 'ok' | 'cancel'
}

// const IS_REACT_16 = !!ReactDOM.createPortal

interface ConfirmDialogState {
  visible?: boolean
  loading?: boolean
  cancelLoading?: boolean
}

class ConfirmDialog extends  React.Component<ConfirmDialogProps & ModalFuncProps, ConfirmDialogState> {
  constructor(props: ConfirmDialogProps & ModalFuncProps) {
    super(props)
    this.state = {
      visible: props.visible || false,
      loading: false,
      cancelLoading: false
    }
  }

  static defaultProps = {
    okButtonProps: {},
    cancelButtonProps: {},
  }

  onClick = (source?: string) => {
    const {
      onOk,
      onCancel
    } = this.props

    const hideModal = () => this.setState({
      visible: false
    })

    const wrapFun = (actionFn: (...args: any[]) => any | PromiseLike<any>, closeModal: (...args: any[]) => any, type?: boolean) => {
      if (actionFn) {
        let ret
        if (actionFn.length) {
          ret = actionFn(closeModal)
        } else {
          ret = actionFn()
          if (!ret) {
            closeModal()
          }
        }
        if (ret && ret.then) {
          this.setState({ loading: true })
          ret.then(
            (...args: any[]) => {
              closeModal(...args)
            },
            () => {
              this.setState({ loading: false })
            }
          )
        }
      } else {
        closeModal()
      }
    }

    if (source) {
      if (onOk || onCancel) {
        if (source === 'ok' && onOk) { 
          wrapFun(onOk, hideModal, true)
        } else if (source === 'cancel' && onCancel){
          wrapFun(onCancel, hideModal, false)
        } else {
          hideModal()
        }
      } else {
        hideModal()
      }
    } else {
      hideModal()
    }
  }

  render() {
    const {
      zIndex,
      keyboard,
      centered,
      maskStyle,
      okButtonProps,
      cancelButtonProps,
      icon,
      close
      // iconType = 'question-circle',
    } = this.props

    const {
      visible,
      loading
      cancelLoading,
    } = this.state
  
    // 支持传入{ icon: null }来隐藏`Modal.confirm`默认的Icon
    // const icon = props.icon === undefined ? iconType : props.icon;
    // const okType = props.okType || 'primary';
    // 默认为 true，保持向下兼容
    const okCancel = 'okCancel' in this.props ? this.props.okCancel! : true;
    const width = this.props.width || 416;
    const style = this.props.style || {};
    const mask = this.props.mask === undefined ? true : this.props.mask;
    // 默认为 false，保持旧版默认行为
    const maskClosable = this.props.maskClosable === undefined ? false : this.props.maskClosable;
  
    const okText = this.props.okText || '确定'
    const cancelText = this.props.cancelText || '取消'
  
    const classString = classNames(
      `${prefixCls}`,
      `${prefixCls}-${this.props.type}`,
      this.props.className
    )
  
    const cancelButton = okCancel && (
      <Button
        onClick={() => this.onClick('cancel')}
        loading={cancelLoading || cancelButtonProps.loading}
        {...cancelButtonProps}
      >
        {cancelText}
      </Button>
    )
  
    // const iconNode = typeof icon === 'string' ? <Icon type={icon} /> : icon;
  
    return (
      <Modal
        className={classString}
        onCancel={() => this.onClick()}
        afterClose={close}
        visible={visible}
        title=""
        footer=""
        mask={mask}
        maskClosable={maskClosable}
        maskStyle={maskStyle}
        style={style}
        width={width}
        zIndex={zIndex}
        keyboard={keyboard}
        centered={centered}
        hideCancel={okCancel}
      >
        <div className={`${prefixCls}-body`}>
          <div className={`${prefixCls}-title`}>
            { icon ? <div style={{marginRight: 15, display: 'flex'}}>{icon}</div> : null }
            <span>{this.props.title}</span>
          </div>
          <div className={`${prefixCls}-content`} style={icon ? {marginLeft: 37} : {}}>{this.props.content}</div>
        </div>
        <div className={`${prefixCls}-btns`}>
          {cancelButton}
          <Button
            {...okButtonProps}
            loading={loading || okButtonProps.loading}
            onClick={() => this.onClick('ok')}
            style={{marginLeft: 8}}
          >
            {okText}
          </Button>
        </div>
      </Modal>
    )
  }
}

export default function confirm(config: ModalFuncProps) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  let currentConfig = { ...config, close, visible: true } as any

  function close(...args: any[]) {
    destroy(...args)
  }

  function update(newConfig: ModalFuncProps) {
    currentConfig = {
      ...currentConfig,
      ...newConfig
    }
    render(currentConfig)
  }

  function destroy(...args: any[]) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div)

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div)
    }

    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i]
      if (fn === close) {
        destroyFns.splice(i, 1)
        break
      }
    }
  }

  function render(props: any) {
    ReactDOM.render(<ConfirmDialog {...props} />, div)
  }

  render(currentConfig)

  destroyFns.push(close)

  return {
    destroy: close,
    update
  }
}
