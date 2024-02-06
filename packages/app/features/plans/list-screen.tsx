import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { SignedIn, SignedOut } from '@clerk/clerk-react'

export function MealPlanListScreen() {
  return (
    <View className="flex-1">
      <SignedIn>
        <Text>Meal Plan List View</Text>
      </SignedIn>
      <SignedOut>
        <Text>Create an account to start saving meal plans!</Text>
      </SignedOut>
    </View>
  )
}
