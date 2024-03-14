import MealPlanNavTabs, {
  ActiveTabOptions,
} from 'app/components/MealPlanNavTabs'
import RecipeCard from 'app/components/RecipeCard'
import { api } from 'app/convex/_generated/api'
import { Id } from 'app/convex/_generated/dataModel'
import { Text, TextLink } from 'app/design/typography'
import { ScrollView, View } from 'app/design/view'
import { useQuery } from 'convex/react'
import { createParam } from 'solito'
type Params = {
  mealPlanId: string
}

const { useParam, useParams } = createParam<Params>()

export function MealPlanDetailScreen() {
  const { params, setParams } = useParams()
  const mealPlanId = params.mealPlanId as Id<'mealPlans'>
  const getMealPlan = useQuery(api.mealPlans.getMealPlan, { mealPlanId })
  return (
    <ScrollView
      accessibilityRole="main"
      className="p-4 md:p-8"
      contentContainerStyle={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <MealPlanNavTabs
        mealPlanId={mealPlanId}
        activeTab={ActiveTabOptions.recipes}
      />
      <View className="w-full max-w-7xl rounded-3xl bg-slate-200">
        <View className="flex w-full flex-row flex-wrap justify-center p-2">
          {getMealPlan?.recipes.map((recipe) => <RecipeCard recipe={recipe} />)}
        </View>
      </View>
    </ScrollView>
  )
}
