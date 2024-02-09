import { P, Text } from 'app/design/typography'
import { Button, Pressable, SpinButton } from 'app/design/button'
import { View, ScrollView } from 'app/design/view'
import { useState } from 'react'
import RecipeCard, { SpoonacularRecipe } from 'app/components/RecipeCard'
import { useConvexAuth, useMutation, useQuery } from 'convex/react'
import { useAuth } from '@clerk/clerk-react'
import { useRouter } from 'solito/router'
import { Icon } from 'react-native-eva-icons'
import colors from 'tailwindcss/colors'
import { api } from 'app/convex/_generated/api'
import * as Burnt from 'burnt'

export function HomeScreen() {
  const { isAuthenticated } = useConvexAuth()
  const { getToken } = useAuth()

  const router = useRouter()

  const [recipes, setRecipes] = useState<Array<SpoonacularRecipe>>([])
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const saveMealPlan = useMutation(api.mealPlans.saveMealPlan)
  const lockedRecipes = recipes.filter((r: SpoonacularRecipe) => r.locked)
  const lockedRecipeCount = lockedRecipes.length
  const userSettings = useQuery(api.settings.getUserSettings, {})

  const getRandomRecipes = async () => {
    const numberOfRecipesToSpin =
      userSettings.numberOfRecipes - lockedRecipeCount

    const url = new URL(
      (process.env.NEXT_PUBLIC_CONVEX_SITE ??
        process.env.EXPO_PUBLIC_CONVEX_SITE) + '/getRandom',
    )
    url.searchParams.set('number', numberOfRecipesToSpin.toString())

    const oldRecipes = recipes.map((r) => ({ ...r }))
    const loadingRecipes = recipes.length
      ? []
      : Array(numberOfRecipesToSpin).fill({ loading: true })
    recipes.forEach((recipe: SpoonacularRecipe) => {
      if (!recipe.locked) {
        recipe.loading = true
        loadingRecipes.push(recipe)
      } else {
        loadingRecipes.push(recipe)
      }
    })
    setRecipes(loadingRecipes)

    const headers = new Headers()
    if (isAuthenticated) {
      const token = await getToken({ template: 'convex' })
      headers.set('Authorization', 'Bearer ' + token)
    }

    try {
      const response = await fetch(url, { method: 'GET', headers })

      if (response.status === 200) {
        const recipeResults = await response.json()
        const newRecipes = recipeResults
        lockedRecipes.forEach((recipe) => {
          const index = recipes.indexOf(recipe)
          newRecipes.splice(index, 0, recipe)
        })
        setRecipes(newRecipes)
        setIsError(false)
      }

      if (response.status === 429) {
        setRecipes(oldRecipes)
        setIsError(true)
        setErrorMessage('Spin limit reached.')
      }
    } catch (error) {
      console.error(error)
    }
  }
  const lockRecipe = (recipe: SpoonacularRecipe) => {
    const recipeIndex = recipes.findIndex((r) => r.id === recipe.id)
    const lockedRecipe = recipes[recipeIndex]
    if (lockedRecipe) {
      const newRecipes = [...recipes]
      newRecipes[recipeIndex].locked = !newRecipes[recipeIndex].locked
      setRecipes(newRecipes)
    }
  }

  const handleSave = async () => {
    if (isAuthenticated && readyToSave) {
      const response = await saveMealPlan({ recipes })
      if (response) {
        await Burnt.toast({
          title: 'Saved meal plan!',
          from: 'bottom',
          preset: 'done',
        })
        setRecipes([])
      }
    } else if (!isAuthenticated && readyToSave) {
      await Burnt.toast({
        title: 'Could not save meal plan',
        message: 'Create an account first!',
        from: 'bottom',
        preset: 'custom',
        layout: { iconSize: { height: 36, width: 36 } },
        icon: {
          ios: {
            name: 'person',
            color: colors.orange['500'],
          },
          web: (
            <Icon
              name="person-outline"
              height={24}
              width={24}
              fill={colors.orange['500']}
              style={{ marginRight: 10 }}
            />
          ),
        },
      })
    }
  }

  const readyToSave = recipes.length && !recipes.some((r) => r.loading)

  return (
    <ScrollView
      accessibilityRole="main"
      className="p-4 md:p-8"
      contentContainerStyle={{
        display: 'flex',
        minHeight: 700,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View className="min-h-[50%] w-full max-w-7xl rounded-3xl bg-slate-200">
        <View className="flex w-full flex-row flex-wrap justify-center p-2">
          {isError ? (
            <View className="w-full items-center p-2">
              <View className=" w-full items-center justify-center rounded-md bg-red-300 p-2 sm:w-1/2">
                <Text>
                  {errorMessage}{' '}
                  {isAuthenticated
                    ? 'Try again later.'
                    : 'Sign up to spin more!'}
                </Text>
                <Pressable
                  tw="absolute right-0 m-2"
                  onPress={() => {
                    setIsError(false)
                  }}
                >
                  <Icon
                    name="close"
                    height={16}
                    width={16}
                    fill={colors.red['800']}
                  />
                </Pressable>
              </View>
            </View>
          ) : null}
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
        <View className="pointer-events-none mb-40 min-h-[32em] w-full flex-1 flex-row items-start justify-around sm:m-10 sm:justify-between">
          {readyToSave ? (
            <Button
              onPress={handleSave}
              className="pointer-events-auto relative w-24"
            >
              <Text className="text-center text-white">Save</Text>
            </Button>
          ) : (
            <View className="hidden sm:invisible sm:block" />
          )}
          <Button
            className={
              'pointer-events-auto relative w-24 bg-orange-500 ' +
              (isAuthenticated ? '' : 'hidden')
            }
            onPress={() => router.push('/settings')}
          >
            <Text className="text-center text-white">Settings</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}
