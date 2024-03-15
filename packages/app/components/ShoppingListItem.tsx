import { Text } from 'app/design/typography'
import { View } from 'app/design/view'

export default function ShoppingListItem({
  listItem,
}: {
  listItem: Array<{
    name: string
    measures: Array<{
      amount: number
      unitShort: string
      unitLong: string
      recipeId: number
    }>
  }>
}) {
  return (
    <View className="p-2">
      <Text>
        {toProperCase(listItem.name)}:{' '}
        {listItem.measures.map(
          (measure) => `${measure.amount} ${measure.unitShort}`,
        )}
      </Text>
    </View>
  )
}

const toProperCase = (string: string) => {
  return string.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  })
}
