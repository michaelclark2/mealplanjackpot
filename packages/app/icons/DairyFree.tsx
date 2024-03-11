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
      className="icon icon-tabler icons-tabler-outline icon-tabler-milk-off"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path stroke={fill} d="M10 6h6v-2a1 1 0 0 0 -1 -1h-6a1 1 0 0 0 -1 1" />
      <path
        stroke={fill}
        d="M16 6l1.094 1.759a6 6 0 0 1 .906 3.17v3.071m0 4v1a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8.071a6 6 0 0 1 .906 -3.17l.327 -.525"
      />
      <path stroke={fill} d="M12 16m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path stroke={fill} d="M3 3l18 18" />
    </svg>
  )
}
