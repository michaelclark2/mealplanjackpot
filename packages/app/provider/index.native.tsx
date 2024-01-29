import { SafeArea } from './safe-area'
import Convex from './convex-provider.native'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Convex>
      <SafeArea>{children}</SafeArea>
    </Convex>
  )
}
