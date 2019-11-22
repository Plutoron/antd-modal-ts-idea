/* eslint-disable */ import * as React from 'react'
interface Props {
  className?: string;
  size?: string | number;
  fill?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}
const style = {
  display: 'inline-block',
  flex: '0 0 auto',
  cursor: 'pointer'
}
export default class SvgTishi extends React.PureComponent<Props, {}> {
  render() {
    const props = this.props
    const {size, fill} = props
    return (
      <svg
        {...props}
        data-name="\u56FE\u5C42 1"
        viewBox="0 0 16 16"
        preserveAspectRatio="xMidYMid meet"
        fontSize={size || 32}
        fill={fill || 'currentColor'}
        style={style}
        width="1em"
        height="1em"
      >
       <path d="M8,5.7c-0.5,0-0.8-0.4-0.8-0.9C7.2,4.4,7.5,4,8,4
	s0.8,0.4,0.8,0.9C8.8,5.3,8.4,5.7,8,5.7 M8.6,11.8c0,0.1-0.1,0.2-0.2,0.2H7.6c-0.1,0-0.2-0.1-0.2-0.2V7c0-0.1,0.1-0.2,0.2-0.2h0.8
	c0.1,0,0.2,0.1,0.2,0.2V11.8z M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0"/>
      </svg>
    )
  }
}
/* eslint-enable */
