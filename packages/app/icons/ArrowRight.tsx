import { Path, Svg } from 'react-native-svg'

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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path stroke={fill} d="M5 12l14 0" />
      <Path stroke={fill} d="M13 18l6 -6" />
      <Path stroke={fill} d="M13 6l6 6" />
    </Svg>
  )
}
