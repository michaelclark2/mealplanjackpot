import { P, Text } from 'app/design/typography'
import { Button, SpinButton } from 'app/design/button'
import { View, ScrollView } from 'app/design/view'
import { useState } from 'react'
import RecipeCard from 'app/components/RecipeCard'

export function HomeScreen() {
  const [recipes, setRecipes] = useState([])
  const [numberOfRecipes, setNumberOfRecipes] = useState(5)
  const lockedRecipes = recipes.filter((r) => r.locked)
  const lockedRecipeCount = lockedRecipes.length

  const getRandomRecipes = () => {
    const numberOfRecipesToSpin = numberOfRecipes - lockedRecipeCount

    const url = new URL(
      (process.env.NEXT_PUBLIC_CONVEX_SITE ??
        process.env.EXPO_PUBLIC_CONVEX_SITE) + '/getRandom',
    )
    url.searchParams.set('number', numberOfRecipesToSpin.toString())
    fetch(url).then((res) => {
      res.json().then((recipeResults) => {
        const newRecipes = [...recipes]
        const recipesToReplace = recipes.filter((r) => !r.locked)
        recipeResults.forEach((newRecipe) => {
          if (recipesToReplace.length) {
            const oldRecipe = recipesToReplace.pop()
            const index = newRecipes.findIndex((r) => r.id === oldRecipe.id)
            newRecipes.splice(index, 1, newRecipe)
          } else {
            newRecipes.push(newRecipe)
          }
        })
        setRecipes(newRecipes)
      })
    })
  }
  const lockRecipe = (recipe) => {
    const recipeIndex = recipes.findIndex((r) => r.id === recipe.id)
    const lockedRecipe = recipes[recipeIndex]
    if (lockedRecipe) {
      const newRecipes = [...recipes]
      newRecipes[recipeIndex].locked = !newRecipes[recipeIndex].locked
      setRecipes(newRecipes)
    }
  }

  return (
    <ScrollView
      className="p-4 md:p-8"
      contentContainerStyle={{
        display: 'flex',
        minHeight: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View className="min-h-[50%] w-full max-w-7xl rounded-3xl bg-slate-200">
        <View className="flex w-full flex-row flex-wrap justify-center p-2">
          {recipes?.length > 0 ? (
            recipes?.map((r) => (
              <RecipeCard lockRecipe={lockRecipe} key={r.id} recipe={r} />
            ))
          ) : (
            <P className="text-center">Let's get spinning!</P>
          )}
        </View>
      </View>
      <View className="w-full max-w-7xl flex-1 flex-col items-center justify-between">
        <View className="m-3 sm:absolute sm:self-center">
          <SpinButton className="" onPress={() => getRandomRecipes()}>
            <Text className="font-extrabold text-white">Spin</Text>
          </SpinButton>
        </View>
        <View className="min-h-32 pointer-events-none mb-40 w-full flex-1 flex-row items-start justify-around space-x-3 sm:m-10 sm:justify-between">
          <Button
            className="pointer-events-auto relative w-24"
            onPress={() => console.log('clicky button')}
          >
            <Text className="text-center text-white">Save</Text>
          </Button>
          <Button
            className="pointer-events-auto relative w-24 bg-orange-500"
            onPress={() => console.log('clicky button')}
          >
            <Text className="text-center text-white">Settings</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}
