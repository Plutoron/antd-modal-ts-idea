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
export default class SvgWenhao extends React.PureComponent<Props, {}> {
  render() {
    const props = this.props
    const {size, fill} = props
    return (
      <svg
        {...props}
        data-name="\u56FE\u5C42 1"
        viewBox="0 0 40 40"
        preserveAspectRatio="xMidYMid meet"
        fontSize={size || 32}
        fill={fill || 'currentColor'}
        style={style}
        width="1em"
        height="1em"
      >
        <path d="M20 0a20 20 0 1 0 20 20A20 20 0 0 0 20 0zm0 36.92A16.92 16.92 0 1 1 36.92 20 16.94 16.94 0 0 1 20 36.92z" />
        <path d="M20 31.46a1.79 1.79 0 1 1 1.79-1.79A1.79 1.79 0 0 1 20 31.46zm0-5.63a1.48 1.48 0 0 1-1.48-1.48v-2c0-2.07 1.54-3.61 2.89-5 .89-.89 1.89-1.89 1.89-2.57a3.31 3.31 0 0 0-3.3-3.29 3.23 3.23 0 0 0-3.3 3.24 1.48 1.48 0 1 1-2.95 0 6.25 6.25 0 0 1 12.5.08c0 1.91-1.39 3.3-2.74 4.65-1 .95-2 2-2 2.87v2a1.48 1.48 0 0 1-1.51 1.5z" />
      </svg>
    )
  }
}
/* eslint-enable */
