import * as React from 'react'
import getPrefixCls from 'NemoBase/getPrefixCls'
import Button from '@dtwave/nemo-button'
import {classNames} from './util'

let mousePosition: { x: number; y: number } | null
let mousePositionEventBinded: boolean

function getScroll(w: any, top?: boolean) {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`]
  const method = `scroll${top ? 'Top' : 'Left'}`
  if (typeof ret !== 'number') {
    const d = w.document
    ret = d.documentElement[method]
    if (typeof ret !== 'number') {
      ret = d.body[method]
    }
  }
  return ret
}

function setTransformOrigin(node: any, value: string) {
  const style = node.style;
  ['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix: string) => {
    style[`${prefix}TransformOrigin`] = value
  })
  style[`transformOrigin`] = value
}

function offset(el: any) {
  const rect = el.getBoundingClientRect()
  const pos = {
    left: rect.left,
    top: rect.top,
  }
  const doc = el.ownerDocument
  const w = doc.defaultView || doc.parentWindow
  pos.left += getScroll(w)
  pos.top += getScroll(w, true)
  return pos
}

const prefixCls = getPrefixCls('modal')
const wrapPre = getPrefixCls('modal-wrap')

export interface ModalProps {
  /** 对话框是否可见*/
  visible?: boolean
  /** 标题*/
  title?: React.ReactNode | string
  /** 是否显示右上角的关闭按钮*/
  closable?: boolean
  /** 点击确定回调*/
  onOk?: (e: React.MouseEvent<any>) => void
  /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调*/
  onCancel?: (e: React.MouseEvent<any>) => void
  afterClose?: () => void
  /** 宽度*/
  width?: string | number
  /** 底部内容*/
  footer?: React.ReactNode
  /** 确认按钮文字*/
  okText?: React.ReactNode
  okType?: String 
  /** 取消按钮文字*/
  cancelText?: React.ReactNode
  hideCancel?: boolean
  /** 点击蒙层是否允许关闭*/
  maskClosable?: boolean
  destroyOnClose?: boolean

  style?: React.CSSProperties
  bodyStyle?: React.CSSProperties

  mask?: boolean,

  maskStyle?: React.CSSProperties

  centered?: boolean

  className?: string
  wrapClassName?: string
  zIndex?: number
  keyboard?: boolean

  okButtonProps?: object
  cancelButtonProps?: object

  confirmLoading?: boolean

  /**
   * 父级页面 清除回调
   */
  removeWrap?: () => void
}

export interface ModalFuncProps {
  className?: string
  visible?: boolean
  title?: React.ReactNode
  content?: React.ReactNode
  onOk?: (...args: any[]) => any | PromiseLike<any> 
  onCancel?: (...args: any[]) => any | PromiseLike<any>
  // okButtonProps?: NativeButtonProps
  // cancelButtonProps?: NativeButtonProps
  okButtonProps?: object
  cancelButtonProps?: object
  centered?: boolean
  width?: string | number
  iconClassName?: string
  okText?: React.ReactNode
  // okType?: ButtonType
  okType?: object
  cancelText?: React.ReactNode
  icon?: React.ReactNode
  mask?: boolean
  maskClosable?: boolean
  zIndex?: number
  okCancel?: boolean
  style?: React.CSSProperties
  maskStyle?: React.CSSProperties
  type?: string
  keyboard?: boolean
  transitionName?: string
  maskTransitionName?: string
  afterClose?: () => void
}

interface ModalState {
  visible: boolean
  isEnter: boolean
  animationType: string,
}

export default class Modal extends React.Component<ModalProps, ModalState> {
  private wrap!: HTMLDivElement

  constructor(props: ModalProps) {
    super(props)
    this.state = {
      visible: props.visible || false,
      isEnter: true,
      animationType: 'enter',
    }
  }

  static defaultProps = {
    width: 520,
    visible: false,
    mask: true,
    okText: '确定',
    cancelText: '取消',
    hideCancel: false,
    closable: true,
    destroyOnClose: false,
    maskClosable: true,
    keyboard: true,
    zIndex: 1000,
    footer: true,
    okType: 'primary',
    okButtonProps: {},
    cancelButtonProps: {},
  }

  afterClose = () => {
    const afterClose = this.props.afterClose
    if (afterClose) afterClose()
  }

  handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const onOk = this.props.onOk
    if (onOk) onOk(e)
  }

  handleCancel = (e: any) => {
    const onCancel = this.props.onCancel
    if (onCancel) onCancel(e)
  }

  handleMask = (e: React.MouseEvent<HTMLElement>) => {
    if (this.props.maskClosable) {
      this.leave()
    }
  }

  onAnimationEnd = (ev: React.AnimationEvent<HTMLDivElement>) => {
    const { animationType, isEnter} = this.state
    const removeWrap = this.props.removeWrap

    if (animationType === 'leave' && !isEnter) {
      this.setState({visible: false}, () => {
        this.afterClose()
        if (this.props.destroyOnClose) {
          if (removeWrap) removeWrap()
        }    
      })
    }
  }

  enter = () => {
    this.setState({
      visible: true,
      isEnter: true,
    })
    document.body.style.overflow = 'hidden'
  }

  leave = () => {
    this.setState({
      animationType: 'leave',
      isEnter: false,
    })
    document.body.style.overflow = ''
  }

  onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const {
      keyboard,
    } = this.props

    if (keyboard && e.keyCode === 27) {
      e.stopPropagation()
      this.leave()
      return
    }
  }

  componentWillMount() {
    if (this.props.visible) document.body.style.overflow = 'hidden'
  }


  componentDidMount() {
    if (this.wrap) {
      this.wrap.focus()
    }

    // if (mousePositionEventBinded) {
    //   return;
    // }
    // // 只有点击事件支持从鼠标位置动画展开
    // document.documentElement.addEventListener('click', (e: MouseEvent) => {
    //   mousePosition = {
    //     x: e.pageX,
    //     y: e.pageY,
    //   }
    //   // 100ms 内发生过点击事件，则从点击位置动画展示
    //   // 否则直接 zoom 展示
    //   // 这样可以兼容非点击方式展开
    //   setTimeout(() => (mousePosition = null), 100)
    // })
    // mousePositionEventBinded = true
  }

  componentWillUpdate(prevProps: ModalProps) {
    if (this.wrap) {
      this.wrap.focus()
    }
  }

  componentWillReceiveProps = (nextProps: ModalProps) => {
    if (!this.props.visible && nextProps.visible) {
      this.enter()
    } else if (this.props.visible && !nextProps.visible) {
      this.leave()
    }

    // if (mousePosition) {
    //   const elOffset = offset(this.wrap);

    //   setTransformOrigin(this.wrap,
    //     `${mousePosition.x - elOffset.left}px ${mousePosition.y - elOffset.top}px`);
    // } else {
    //   setTransformOrigin(this.wrap, '');
    // }
  }

  getWrapClasses = () => {
    const {
      centered,
      wrapClassName
    } = this.props

    const { 
      visible
    } = this.state

    return classNames(
      `${prefixCls}`,
      centered ? `${prefixCls}-centered` : '',
      visible ? 'active' : 'hidden',
      `${wrapClassName || ''}`,
    )
  }

  getContainerClasses = () => {
    const {
      className
    } = this.props

    const {
      isEnter,
      visible
    } = this.state

    return classNames(
      `${wrapPre}`,
      `${className || ''}`,
      `${visible && isEnter ? 'fadeIn' : 'fadeOut'}`
    )
  }

  getMaskClasses = () => {
    const {
      isEnter
    } = this.state

    return classNames(
      `${prefixCls}-mask`,
      `${isEnter ? 'fadeIn' : 'fadeOut'}`
    )
  }

  renderClose = () => {
    if (this.props.closable) {
      return (
        <div 
          className={`${prefixCls}-close FBH FBAC FBJC`}
          onClick={this.handleCancel}
        >
        ✕
        </div>
      )
    } else {
      return null
    }
  }

  renderMask = () => {
    const {
      mask,
      maskStyle
    } = this.props

    if (mask) {
      return (
        <div 
          className={this.getMaskClasses()} 
          style={{...maskStyle}}
          onClick={this.handleMask}
        />
      )
    } else {
      return null
    }
  }

  renderFooter = () => {
    const { 
      footer,
      okText, 
      okType,
      cancelText, 
      hideCancel,
      confirmLoading,
      okButtonProps,
      cancelButtonProps,
    } = this.props

    console.log(okButtonProps)

    return (
      footer ? 
        <div className={`${wrapPre}-footer`}>
          {
            !hideCancel ? 
              <Button 
                onClick={this.handleCancel}
                {...cancelButtonProps}
              >
                {cancelText}
              </Button> : ''
          }
          <Button
            type={okType}
            onClick={this.handleOk}
            style={{marginLeft: 8}}
            loading={confirmLoading}
            {...okButtonProps}            
          >
            {okText}
          </Button>
        </div> : ''
    )
  }

  render() {
    const {
      title,
      width,
      style,
      bodyStyle,
      zIndex
    } = this.props

    return (
      <div 
        className={this.getWrapClasses()}
        style={{zIndex}}
      >
        {this.renderMask()}
        <div 
          className={this.getContainerClasses()}
          style={{width, ...style}}
          ref={(ref: HTMLDivElement) => this.wrap = ref}
          tabIndex={-1}
          onKeyDown={this.onKeyDown}
          onAnimationEnd={this.onAnimationEnd}
        >  
          {this.renderClose()}

          {
            title ? <div className={`${wrapPre}-title`}>{title}</div> : null
          }

          <div 
            className={`${wrapPre}-content`}
            style={bodyStyle}
          >
            {this.props.children}
          </div>
          {this.renderFooter()}
        </div>
      </div>
    )
  }
}
