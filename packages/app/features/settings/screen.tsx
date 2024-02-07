import { Text } from 'app/design/typography'
import { Platform } from 'react-native'
import { View } from 'app/design/view'
import { Button, Pressable } from 'app/design/button'
import { SignedIn, useAuth } from '@clerk/clerk-react'
import { useRouter } from 'solito/router'
import { useState } from 'react'
import { Icon } from 'react-native-eva-icons'
import colors from 'tailwindcss/colors'
import { useQuery } from 'convex/react'
import { api } from 'app/convex/_generated/api'

export function SettingsScreen() {
  const userSettings = useQuery(api.settings.getUserSettings)
  const [numberOfRecipes, setNumberOfRecipes] = useState<string>('4')
  const router = useRouter()
  const { signOut } = useAuth()
  const handleLogout = () => {
    signOut().then(() => router.push('/'))
  }
  const renderDietChoices = () => {
    const SPOONACULAR_DIET_CHOICES = [
      ['vegetarian', 'Vegetarian'],
      ['vegan', 'Vegan'],
      ['gluten-free', 'Gluten Free'],
      ['pescatarian', 'Pescatarian'],
      ['ketogenic', 'Ketogenic'],
      ['whole30', 'Whole30'],
      ['paleo', 'Paleo'],
    ]
    return SPOONACULAR_DIET_CHOICES.map((diet) => (
      <Pressable
        className="mb-1 mr-1 rounded border border-orange-500"
        onPress={() => console.log(diet[0])}
      >
        <Text className="p-1">{diet[1]}</Text>
      </Pressable>
    ))
  }

  const renderIntoleranceChoices = () => {
    const SPOONACULAR_ALLERGY_CHOICES = [
      ['dairy', 'Dairy'],
      ['egg', 'Egg'],
      ['gluten', 'Gluten'],
      ['grain', 'Grain'],
      ['peanut', 'Peanut'],
      ['tree nut', 'Tree Nut'],
      ['seafood', 'Seafood'],
      ['shellfish', 'Shellfish'],
      ['sesame', 'Sesame'],
      ['soy', 'Soy'],
      ['sulfite', 'Sulfite'],
      ['wheat', 'Wheat'],
    ]
    return SPOONACULAR_ALLERGY_CHOICES.map((intolerance) => (
      <Pressable
        className="mb-1 mr-1 rounded border border-orange-500"
        onPress={() => console.log(intolerance[0])}
      >
        <Text className="p-1">{intolerance[1]}</Text>
      </Pressable>
    ))
  }
  return (
    <SignedIn>
      <View className="flex-1 p-4 md:p-8">
        {Platform.OS === 'web' ? (
          <Text className="text-lg font-bold">Settings</Text>
        ) : null}
        <View className="m-auto w-full select-none space-y-4 sm:w-1/3">
          <View className="flex-row items-center justify-between">
            <Text className="w-1/3">Number of Recipes</Text>
            <View className="w-2/3 flex-row items-center justify-start">
              <Pressable
                onPress={() =>
                  setNumberOfRecipes((Number(numberOfRecipes) - 1).toString())
                }
              >
                <Icon
                  name="minus-square-outline"
                  width={50}
                  height={50}
                  fill={colors.orange['500']}
                />
              </Pressable>
              <Text className="mx-2 text-3xl">{numberOfRecipes}</Text>
              <Pressable
                onPress={() =>
                  setNumberOfRecipes((Number(numberOfRecipes) + 1).toString())
                }
              >
                <Icon
                  name="plus-square-outline"
                  width={50}
                  height={50}
                  fill={colors.orange['500']}
                />
              </Pressable>
            </View>
          </View>
          <View className="flex-row justify-between">
            <Text>Diet</Text>
            <View className="w-2/3 flex-row flex-wrap">
              {renderDietChoices()}
            </View>
          </View>
          <View className="flex-row justify-between">
            <Text>Intolerances</Text>
            <View className="w-2/3 flex-row flex-wrap">
              {renderIntoleranceChoices()}
            </View>
          </View>
          <Button className="m-auto" onPress={handleLogout}>
            <Text>Logout</Text>
          </Button>
        </View>
      </View>
    </SignedIn>
  )
}
