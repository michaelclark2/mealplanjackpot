import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Button, Pressable } from 'app/design/button'
import { SignedIn, useAuth } from '@clerk/clerk-react'
import { useRouter } from 'solito/router'
import { useState } from 'react'
import { Icon } from 'react-native-eva-icons'
import colors from 'tailwindcss/colors'

export function SettingsScreen() {
  const [numberOfRecipes, setNumberOfRecipes] = useState<string>('4')
  const router = useRouter()
  const { signOut } = useAuth()
  const handleLogout = () => {
    signOut().then(() => router.push('/'))
  }
  return (
    <SignedIn>
      <View className="flex-1 p-4 md:p-8">
        {process.env.NEXT_PUBLIC_CONVEX_SITE ? (
          <Text className="text-lg font-bold">Settings</Text>
        ) : null}
        <View className="m-auto w-full sm:w-1/2">
          <View className="flex-row items-center justify-between">
            <Text>Number of Recipes</Text>
            <View className="w-1/2 flex-row items-center justify-between">
              <Pressable
                className="flex"
                onPress={() =>
                  setNumberOfRecipes((Number(numberOfRecipes) - 1).toString())
                }
              >
                <Icon
                  name="minus-square-outline"
                  width={50}
                  height={50}
                  fill={colors.orange['500']}
                />
              </Pressable>
              <Text className="text-3xl">{numberOfRecipes}</Text>
              <Pressable
                onPress={() =>
                  setNumberOfRecipes((Number(numberOfRecipes) + 1).toString())
                }
              >
                <Icon
                  name="plus-square-outline"
                  width={50}
                  height={50}
                  fill={colors.orange['500']}
                />
              </Pressable>
            </View>
          </View>
          <Button className="m-auto" onPress={handleLogout}>
            <Text>Logout</Text>
          </Button>
        </View>
      </View>
    </SignedIn>
  )
}
