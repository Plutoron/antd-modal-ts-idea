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
export default class SvgGantanhao extends React.PureComponent<Props, {}> {
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
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
        <path d="M464 688a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path>
      </svg>
    )
  }
}
/* eslint-enable */
