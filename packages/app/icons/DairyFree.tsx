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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-milk-off"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path stroke={fill} d="M10 6h6v-2a1 1 0 0 0 -1 -1h-6a1 1 0 0 0 -1 1" />
      <Path
        stroke={fill}
        d="M16 6l1.094 1.759a6 6 0 0 1 .906 3.17v3.071m0 4v1a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8.071a6 6 0 0 1 .906 -3.17l.327 -.525"
      />
      <Path stroke={fill} d="M12 16m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <Path stroke={fill} d="M3 3l18 18" />
    </Svg>
  )
}
