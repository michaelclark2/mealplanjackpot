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
      className="icon icon-tabler icons-tabler-outline icon-tabler-plant-2-off"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path
        stroke={fill}
        d="M2 9c0 5.523 4.477 10 10 10a9.953 9.953 0 0 0 5.418 -1.593m2.137 -1.855a9.961 9.961 0 0 0 2.445 -6.552"
      />
      <Path
        stroke={fill}
        d="M12 19c0 -1.988 .58 -3.84 1.58 -5.397m1.878 -2.167a9.961 9.961 0 0 1 6.542 -2.436"
      />
      <Path stroke={fill} d="M2 9a10 10 0 0 1 10 10" />
      <Path stroke={fill} d="M12 4a9.7 9.7 0 0 1 3 7.013" />
      <Path
        stroke={fill}
        d="M9.01 11.5a9.696 9.696 0 0 1 .163 -2.318m1.082 -2.942a9.696 9.696 0 0 1 1.745 -2.24"
      />
      <Path stroke={fill} d="M3 3l18 18" />
    </Svg>
  )
}
