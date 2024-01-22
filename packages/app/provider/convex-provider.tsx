import { ConvexProvider, ConvexReactClient } from 'convex/react'

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL ?? process.env.EXPO_PUBLIC_CONVEX_URL!,
  {
    unsavedChangesWarning: false,
  },
)
export default function Convex({ children }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}
