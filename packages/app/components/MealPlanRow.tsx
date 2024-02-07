import { api } from 'app/convex/_generated/api'
import { Pressable } from 'app/design/button'
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { useMutation } from 'convex/react'
import { Linking } from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { SolitoImage } from 'solito/image'
import { SpoonacularRecipe } from './RecipeCard'
import * as Burnt from 'burnt'
import { Id } from 'app/convex/_generated/dataModel'

export interface MealPlan {
  _id: Id<'mealPlans'>
  identifier: string
  _createdTime: number
  recipes: Array<SpoonacularRecipe>
  startDate: number
}

export const RecipeCardLite = ({ recipe }: { recipe: SpoonacularRecipe }) => {
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
        alt={recipe.title}
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

export default function MealPlanRow({ mealPlan }: { mealPlan: MealPlan }) {
  const deleteMealPlan = useMutation(api.mealPlans.deleteMealPlan)

  const handleDelete = async () => {
    await deleteMealPlan({ id: mealPlan._id })
    await Burnt.toast({
      title: 'Deleted meal plan!',
      from: 'bottom',
      preset: 'done',
    })
  }
  return (
    <View className="m-2 mb-4 rounded-3xl bg-white p-2 shadow sm:m-4">
      <View className="p-2">
        <Text className="font-extrabold text-orange-500">
          Week of {new Date(mealPlan.startDate).toDateString()}
        </Text>
        <Pressable
          className="absolute right-2 top-2 rounded-full bg-red-500 p-1"
          onPress={handleDelete}
        >
          <Icon name="trash-outline" width={16} height={16} fill={'white'} />
        </Pressable>
      </View>
      <View className="flex-row flex-wrap justify-around p-2 sm:justify-center lg:justify-start">
        {mealPlan.recipes.map((recipe) => (
          <RecipeCardLite recipe={recipe} />
        ))}
      </View>
    </View>
  )
}
