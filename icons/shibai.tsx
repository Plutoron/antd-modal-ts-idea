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
export default class SvgShibai extends React.PureComponent<Props, {}> {
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
        <path d="M28 13.59a1.62 1.62 0 0 0-.48-1.15 1.59 1.59 0 0 0-1.11-.44 1.63 1.63 0 0 0-1.16.48L20 17.69l-5.25-5.25a1.63 1.63 0 0 0-1.16-.44 1.59 1.59 0 0 0-1.15.48 1.63 1.63 0 0 0 0 2.31L17.69 20l-5.25 5.25a1.63 1.63 0 0 0-.44 1.16 1.6 1.6 0 0 0 .48 1.15 1.59 1.59 0 0 0 1.15.48 1.63 1.63 0 0 0 1.16-.48L20 22.31l5.25 5.25a1.63 1.63 0 0 0 1.16.48A1.64 1.64 0 0 0 28 26.41a1.63 1.63 0 0 0-.48-1.16L22.31 20l5.25-5.25a1.63 1.63 0 0 0 .44-1.16z" />
      </svg>
    )
  }
}
/* eslint-enable */
