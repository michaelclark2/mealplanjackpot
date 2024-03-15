import MealPlanNavTabs, {
  ActiveTabOptions,
} from 'app/components/MealPlanNavTabs'
import { api } from 'app/convex/_generated/api'
import { Id } from 'app/convex/_generated/dataModel'
import { Text } from 'app/design/typography'
import { ScrollView, View } from 'app/design/view'
import { useAction, useQuery } from 'convex/react'
import { useEffect } from 'react'
import { createParam } from 'solito'
type Params = {
  mealPlanId: string
}

const toProperCase = (string: string) => {
  return string.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  })
}

const { useParam, useParams } = createParam<Params>()

export function ShoppingListScreen() {
  const { params, setParams } = useParams()
  const mealPlanId = params.mealPlanId as Id<'mealPlans'>
  const shoppingList = useQuery(api.shoppingLists.getShoppingList, {
    mealPlanId,
  })
  const createShoppingList = useAction(
    api.shoppingLists.createShoppingListByMealPlanId,
  )
  useEffect(() => {
    if (shoppingList === null) {
      createShoppingList({ mealPlanId })
    }
  }, [shoppingList])

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
        activeTab={ActiveTabOptions.list}
      />
      {shoppingList &&
        Object.keys(shoppingList?.list).map((item) => (
          <View className="p-2">
            <Text>
              {toProperCase(item)}: {shoppingList.list[item]?.length}
            </Text>
          </View>
        ))}
    </ScrollView>
  )
}
