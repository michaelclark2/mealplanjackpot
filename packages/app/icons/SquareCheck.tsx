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
      className="icon icon-tabler icons-tabler-outline icon-tabler-square"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path
        stroke={fill}
        d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"
      />
      <Path stroke={fill} d="M9 12l2 2l4 -4" />
    </Svg>
  )
}
