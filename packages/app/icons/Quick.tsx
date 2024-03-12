import Svg, { Path } from 'react-native-svg'
export default function Icon({
  fill,
  width,
  height,
}: {
  fill?: string
  width?: number
  height?: number
}) {
  return (
    <Svg
      width={width ?? 24}
      height={height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path stroke="none" d="M0 0h24v24H0z" />
      <Path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" fill={fill} />
    </Svg>
  )
}
