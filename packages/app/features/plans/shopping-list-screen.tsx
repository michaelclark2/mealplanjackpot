import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { createParam } from 'solito'
type Params = {
  mealPlanId: string
}

const { useParam, useParams } = createParam<Params>()

export function ShoppingListScreen() {
  const { params, setParams } = useParams()
  const mealPlanId = params.mealPlanId
  return (
    <View>
      <Text>Shopping List Screen: {mealPlanId}</Text>
    </View>
  )
}
