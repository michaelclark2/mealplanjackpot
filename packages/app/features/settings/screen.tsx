import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Button } from 'app/design/button'
import { SignedIn, useAuth } from '@clerk/clerk-react'
import { useRouter } from 'solito/router'

export function SettingsScreen() {
  const router = useRouter()
  const { signOut } = useAuth()
  const handleLogout = () => {
    signOut().then(() => router.push('/'))
  }
  return (
    <SignedIn>
      <View className="flex-1 p-4 md:p-8">
        {process.env.NEXT_PUBLIC_CONVEX_SITE ? (
          <Text>Settings</Text>
        ) : (
          <Button onPress={handleLogout}>
            <Text>Logout</Text>
          </Button>
        )}
      </View>
    </SignedIn>
  )
}
