import { Text } from 'app/design/typography'
import { ScrollView, View } from 'app/design/view'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { Button } from 'app/design/button'
import { useRouter } from 'solito/router'
import { useQuery } from 'convex/react'
import { api } from 'app/convex/_generated/api'
import MealPlanRow from 'app/components/MealPlanRow'

export function MealPlanListScreen() {
  const router = useRouter()
  const mealPlans = useQuery(api.mealPlans.getMealPlans)
  return (
    <ScrollView className="p-4 sm:p-8" contentContainerStyle={{ flex: 0 }}>
      <View className="min-h-[50%] rounded-3xl bg-slate-200 p-4">
        <SignedIn>
          <View className="">
            {mealPlans?.map((mealPlan) => <MealPlanRow mealPlan={mealPlan} />)}
          </View>
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
    </ScrollView>
  )
}
