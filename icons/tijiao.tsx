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
export default class SvgTijiao extends React.PureComponent<Props, {}> {
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
        <path d="M20 40a20 20 0 1 1 20-20 20 20 0 0 1-20 20zm0-36.92A16.92 16.92 0 1 0 36.92 20 16.94 16.94 0 0 0 20 3.08z" />
        <path d="M16.93 27.68a1.41 1.41 0 0 1-1-.47l-1.17-1.11-.15-.17-5.08-5.08a1.43 1.43 0 0 1-.45-1 1.4 1.4 0 0 1 1.4-1.39 1.35 1.35 0 0 1 .92.35l.1.09 5.5 5.43 11.5-11.5a1.36 1.36 0 0 1 1.08-.51 1.39 1.39 0 0 1 .87 2.47L17.93 27.25a1.35 1.35 0 0 1-1 .43z" />
      </svg>
    )
  }
}
/* eslint-enable */
