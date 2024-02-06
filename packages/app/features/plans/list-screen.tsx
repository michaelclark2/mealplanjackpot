import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { Button } from 'app/design/button'
import { useRouter } from 'solito/router'

export function MealPlanListScreen() {
  const router = useRouter()
  return (
    <View className="flex-1 p-4 sm:p-8">
      <View className="min-h-[50%] rounded-3xl bg-slate-200 p-4">
        <SignedIn>
          <Text>Meal Plan List View</Text>
        </SignedIn>
        <SignedOut>
          <View className="flex items-center space-y-10">
            <Text className="text-center text-lg font-bold">
              Create an account to view your saved meal plans!
            </Text>
            <Button onPress={() => router.push('/user/signin')}>
              <Text>Login</Text>
            </Button>
          </View>
        </SignedOut>
      </View>
    </View>
  )
}
