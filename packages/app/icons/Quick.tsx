export default function Icon(props) {
  const { fill, width, height } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 24}
      height={height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" fill={fill} />
    </svg>
  )
}
