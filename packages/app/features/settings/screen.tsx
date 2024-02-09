import { Text } from 'app/design/typography'
import { Platform } from 'react-native'
import { View } from 'app/design/view'
import { Pressable } from 'app/design/button'
import { SignedIn } from '@clerk/clerk-react'
import { Icon } from 'react-native-eva-icons'
import colors from 'tailwindcss/colors'
import { useMutation, useQuery } from 'convex/react'
import { api } from 'app/convex/_generated/api'

export function SettingsScreen() {
  const userSettings = useQuery(api.settings.getUserSettings, {})
  const editUserSettings = useMutation(api.settings.editUserSettings)

  const handleNumberChange = (amount: number) => {
    if (
      userSettings.numberOfRecipes + amount >= 1 &&
      userSettings.numberOfRecipes + amount <= 7
    ) {
      editUserSettings({
        id: userSettings._id,
        numberOfRecipes: userSettings.numberOfRecipes + amount,
      })
    }
  }

  const handleDietChange = (diet: string) => {
    let newDiet = [...userSettings.diet]
    const selected = newDiet.includes(diet)
    if (selected) {
      newDiet = newDiet.filter((d) => d !== diet)
    } else {
      newDiet.push(diet)
    }
    editUserSettings({
      id: userSettings._id,
      diet: newDiet,
    })
  }
  const handleIntoleranceChange = (intolerance: string) => {
    let newIntolerances = [...userSettings.intolerances]
    const selected = newIntolerances.includes(intolerance)
    if (selected) {
      newIntolerances = newIntolerances.filter((i) => i !== intolerance)
    } else {
      newIntolerances.push(intolerance)
    }
    editUserSettings({
      id: userSettings._id,
      intolerances: newIntolerances,
    })
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
    return SPOONACULAR_DIET_CHOICES.map((diet) => {
      const selected = userSettings?.diet?.includes(diet[0])
      const selectedButtonClass = selected
        ? 'bg-orange-500'
        : 'border border-orange-500'
      return (
        <Pressable
          className={'mb-1 mr-1 rounded ' + selectedButtonClass}
          onPress={() => handleDietChange(diet[0])}
        >
          <Text className={'p-2 ' + (selected ? 'text-white' : '')}>
            {diet[1]}
          </Text>
        </Pressable>
      )
    })
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
    return SPOONACULAR_ALLERGY_CHOICES.map((intolerance) => {
      const selected = userSettings?.intolerances?.includes(intolerance[0])
      const selectedButtonClass = selected
        ? 'bg-orange-500'
        : 'border border-orange-500'
      return (
        <Pressable
          className={'mb-1 mr-1 rounded ' + selectedButtonClass}
          onPress={() => handleIntoleranceChange(intolerance[0])}
        >
          <Text className={'p-2 ' + (selected ? 'text-white' : '')}>
            {intolerance[1]}
          </Text>
        </Pressable>
      )
    })
  }
  return (
    <SignedIn accessibilityRole="main">
      <View className="flex-1 p-4 md:p-8">
        {Platform.OS === 'web' ? (
          <Text className="text-lg font-bold">Settings</Text>
        ) : null}
        <View className="mx-auto w-full select-none justify-start space-y-10  md:w-2/3 lg:w-1/3">
          <View className="flex-row items-center justify-between">
            <Text className="w-1/3 font-bold">Number of Recipes</Text>
            <View className="w-2/3 flex-row items-center justify-start">
              <Pressable onPress={() => handleNumberChange(-1)}>
                <Icon
                  name="minus-square-outline"
                  width={50}
                  height={50}
                  fill={colors.orange['500']}
                />
              </Pressable>
              <Text className="mx-2 text-3xl font-bold">
                {userSettings?.numberOfRecipes}
              </Text>
              <Pressable onPress={() => handleNumberChange(1)}>
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
            <Text className="font-bold">Diet</Text>
            <View className="w-2/3 flex-row flex-wrap">
              {renderDietChoices()}
            </View>
          </View>
          <View className="flex-row justify-between">
            <Text className="font-bold">Intolerances</Text>
            <View className="w-2/3 flex-row flex-wrap">
              {renderIntoleranceChoices()}
            </View>
          </View>
        </View>
      </View>
    </SignedIn>
  )
}
