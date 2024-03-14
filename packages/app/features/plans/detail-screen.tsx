import { Text, TextLink } from 'app/design/typography'
import { View } from 'app/design/view'
import { createParam } from 'solito'
type Params = {
  mealPlanId: string
}

const { useParam, useParams } = createParam<Params>()

export function MealPlanDetailScreen() {
  const { params, setParams } = useParams()
  const mealPlanId = params.mealPlanId
  return (
    <View>
      <Text>Meal Plan Detail: {mealPlanId}</Text>
      <TextLink href={`/plans/${mealPlanId}/list/`}>
        View Shopping List
      </TextLink>
    </View>
  )
}
