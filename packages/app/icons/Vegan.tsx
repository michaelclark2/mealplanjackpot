export default function Icon(props) {
  const { fill, width, height } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 24}
      height={height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-circle-letter-v"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path stroke={fill} d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path stroke={fill} d="M10 8l2 8l2 -8" />
    </svg>
  )
}
