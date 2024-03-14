import MealPlanNavTabs, {
  ActiveTabOptions,
} from 'app/components/MealPlanNavTabs'
import { Id } from 'app/convex/_generated/dataModel'
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { createParam } from 'solito'
type Params = {
  mealPlanId: string
}

const { useParam, useParams } = createParam<Params>()

export function ShoppingListScreen() {
  const { params, setParams } = useParams()
  const mealPlanId = params.mealPlanId as Id<'mealPlans'>
  return (
    <View>
      <MealPlanNavTabs
        mealPlanId={mealPlanId}
        activeTab={ActiveTabOptions.list}
      />
      <Text>Shopping List Screen: {mealPlanId}</Text>
    </View>
  )
}
