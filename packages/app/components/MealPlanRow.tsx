import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { SolitoImage } from 'solito/image'

export default function MealPlanRow({ mealPlan }) {
  return (
    <View className="m-2 mb-4 rounded-3xl bg-white p-2 shadow sm:m-4">
      <View className="p-2">
        <Text className="font-extrabold text-orange-500">
          Week of {new Date(mealPlan.startDate).toDateString()}
        </Text>
      </View>
      <View className="flex-row flex-wrap justify-around p-2 sm:flex-row sm:justify-start sm:space-x-3">
        {mealPlan.recipes.map((recipe) => (
          <View className="m-1 box-border h-auto w-[45%] rounded-3xl p-0 sm:m-0 sm:w-[13.5%]">
            <SolitoImage
              src={recipe.image}
              width={100}
              height={100}
              contentFit="cover"
              contentPosition="center"
              style={{ borderRadius: 24, width: '100%', maxHeight: 100 }}
            />

            <Text className="p-2 text-xs font-bold leading-3  sm:leading-4">
              {recipe.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}
