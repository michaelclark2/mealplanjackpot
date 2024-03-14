import { Id } from 'app/convex/_generated/dataModel'
import { Text, TextLink } from 'app/design/typography'
import { View } from 'app/design/view'

export default function MealPlanNavTabs({
  mealPlanId,
}: {
  mealPlanId: Id<'mealPlans'>
}) {
  return (
    <View className="mb-4 flex w-full flex-row items-center justify-between space-x-4 sm:mb-8">
      <View className="flex-1 rounded-3xl bg-slate-200">
        <TextLink href={`/plans/${mealPlanId}/`} className="p-6 text-center">
          Recipes
        </TextLink>
      </View>
      <View className="flex-1 rounded-3xl bg-slate-200">
        <TextLink
          href={`/plans/${mealPlanId}/list/`}
          className="p-6 text-center"
        >
          Shopping List
        </TextLink>
      </View>
    </View>
  )
}
