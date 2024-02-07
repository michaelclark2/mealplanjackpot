import { Pressable } from 'app/design/button'
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { Linking } from 'react-native'
import { SolitoImage } from 'solito/image'

export const RecipeCardLite = ({ recipe }) => {
  const viewRecipeURL = () => {
    Linking.canOpenURL(recipe.sourceUrl).then((supported) => {
      if (supported) {
        Linking.openURL(recipe.sourceUrl)
      } else {
        console.log('Cannot open url for some reason')
      }
    })
  }
  return (
    <Pressable
      onPress={viewRecipeURL}
      style={{ borderWidth: 0.75 }}
      className="m-1 box-border h-auto w-[45%] rounded-3xl border-slate-100 bg-white p-0 shadow md:w-1/5 lg:w-[13%]"
    >
      <SolitoImage
        src={recipe.image}
        width={100}
        height={100}
        contentFit="cover"
        contentPosition="center"
        style={{
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
          width: '100%',
          maxHeight: 100,
        }}
      />

      <Text className="p-3 text-xs font-bold leading-3  sm:leading-4">
        {recipe.title}
      </Text>
    </Pressable>
  )
}

export default function MealPlanRow({ mealPlan }) {
  return (
    <View className="m-2 mb-4 rounded-3xl bg-white p-2 shadow sm:m-4">
      <View className="p-2">
        <Text className="font-extrabold text-orange-500">
          Week of {new Date(mealPlan.startDate).toDateString()}
        </Text>
      </View>
      <View className="flex-row flex-wrap justify-around p-2 sm:justify-center lg:justify-start">
        {mealPlan.recipes.map((recipe) => (
          <RecipeCardLite recipe={recipe} />
        ))}
      </View>
    </View>
  )
}
