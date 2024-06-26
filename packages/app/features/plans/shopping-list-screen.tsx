import MealPlanNavTabs, {
  ActiveTabOptions,
} from 'app/components/MealPlanNavTabs'
import ShoppingListItem, { ListItem } from 'app/components/ShoppingListItem'
import { api } from 'app/convex/_generated/api'
import { Doc, Id } from 'app/convex/_generated/dataModel'
import { ScrollView, View } from 'app/design/view'
import { useAction, useMutation, useQuery } from 'convex/react'
import { useEffect } from 'react'
import { createParam } from 'solito'
type Params = {
  mealPlanId: string
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
  const updateShoppingList = useMutation(api.shoppingLists.updateShoppingList)

  useEffect(() => {
    if (shoppingList === null) {
      createShoppingList({ mealPlanId })
    }
  }, [shoppingList])

  const toggleItemCompleted = (itemName: string) => {
    let items = shoppingList.completedItems
    if (items.includes(itemName)) {
      items = items.filter((name: string) => name !== itemName)
    } else {
      items.push(itemName)
    }
    updateShoppingList({
      shoppingListId: shoppingList._id,
      completedItems: items,
    })
  }

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
      <View className="w-full md:w-4/5 lg:w-1/2">
        {shoppingList &&
          shoppingList?.list?.map((item: ListItem) => (
            <ShoppingListItem
              listItem={item}
              updateShoppingList={toggleItemCompleted}
              isCompleted={shoppingList?.completedItems?.includes(item.name)}
            />
          ))}
      </View>
    </ScrollView>
  )
}
