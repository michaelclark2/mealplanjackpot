import { Id } from 'app/convex/_generated/dataModel'
import { TextLink } from 'app/design/typography'
import { View } from 'app/design/view'

export enum ActiveTabOptions {
  recipes,
  list,
}

export default function MealPlanNavTabs({
  mealPlanId,
  activeTab,
}: {
  mealPlanId: Id<'mealPlans'>
  activeTab: ActiveTabOptions
}) {
  const activeClass = 'border border-orange-600 bg-orange-500 shadow'
  const inactiveClass = 'border border-orange-300 bg-orange-200'
  return (
    <View className="mb-4 flex w-full flex-row items-center justify-between space-x-4 sm:mb-8">
      <View
        className={
          'flex-1 rounded-3xl ' +
          (activeTab === ActiveTabOptions.recipes ? activeClass : inactiveClass)
        }
      >
        <TextLink href={`/plans/${mealPlanId}/`} className="p-6 text-center">
          Recipes
        </TextLink>
      </View>
      <View
        className={
          'flex-1 rounded-3xl ' +
          (activeTab === ActiveTabOptions.list ? activeClass : inactiveClass)
        }
      >
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
