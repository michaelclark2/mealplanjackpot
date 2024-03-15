import { Text } from 'app/design/typography'
import { View } from 'app/design/view'

import Square from 'app/icons/Square'
import SquareCheck from 'app/icons/SquareCheck'

export type ListItem = {
  name: string
  measures: Array<{
    amount: number
    unitShort: string
    unitLong: string
    recipeId: number
  }>
}

export default function ShoppingListItem({
  listItem,
  updateShoppingList,
  isCompleted,
}: {
  updateShoppingList: (itemName: string) => void
  isCompleted?: boolean
  listItem: ListItem
}) {
  return (
    <View className="my-2 flex flex-row items-center justify-between rounded-full bg-slate-200 p-2">
      <View className="rounded-full bg-white p-2">
        {isCompleted ? <SquareCheck fill="black" /> : <Square fill="black" />}
      </View>
      <View className="flex-1 flex-row items-center justify-between">
        <Text className="ml-4 text-lg">{toProperCase(listItem.name)}</Text>
        <View className="max-w-1/2 -m-2 flex flex-row rounded-full border-2 border-slate-200 bg-white p-2">
          {listItem.measures.map((measure) => (
            <View className="mx-1 min-h-[42px] min-w-[42px] rounded-full bg-orange-500">
              <Text className="-p-2 m-0 text-center text-xl font-black">
                {measure.amount}
              </Text>
              <Text className="-p-2 -m-2 text-center text-xs">
                {measure.unitShort === '' ? 'whole' : measure.unitShort}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

const toProperCase = (string: string) => {
  return string.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  })
}
