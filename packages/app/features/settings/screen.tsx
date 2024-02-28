import { Text } from 'app/design/typography'
import { Platform } from 'react-native'
import { View } from 'app/design/view'
import { Pressable } from 'app/design/button'
import { SignedIn } from '@clerk/clerk-react'
import { Icon } from 'react-native-eva-icons'
import colors from 'tailwindcss/colors'
import { useMutation, useQuery } from 'convex/react'
import { api } from 'app/convex/_generated/api'
import { Doc } from 'app/convex/_generated/dataModel'

export function SettingsScreen() {
  const userSettings = useQuery(api.settings.getUserSettings, {})
  const editUserSettings = useMutation(api.settings.editUserSettings)

  const handleNumberChange = (amount: number) => {
    const { _id, numberOfRecipes } = userSettings as Doc<'userSettings'>
    if (numberOfRecipes + amount >= 1 && numberOfRecipes + amount <= 7) {
      editUserSettings({
        id: _id,
        numberOfRecipes: numberOfRecipes + amount,
      })
    }
  }

  const handleDietChange = (dietToAdd: string) => {
    const { _id, diet } = userSettings as Doc<'userSettings'>
    let newDiet = [...diet]
    const selected = newDiet.includes(dietToAdd)
    if (selected) {
      newDiet = newDiet.filter((d) => d !== dietToAdd)
    } else {
      newDiet.push(dietToAdd)
    }
    editUserSettings({
      id: _id,
      diet: newDiet,
    })
  }
  const handleIntoleranceChange = (intoleranceToAdd: string) => {
    const { _id, intolerances } = userSettings as Doc<'userSettings'>
    let newIntolerances = [...intolerances]
    const selected = newIntolerances.includes(intoleranceToAdd)
    if (selected) {
      newIntolerances = newIntolerances.filter((i) => i !== intoleranceToAdd)
    } else {
      newIntolerances.push(intoleranceToAdd)
    }
    editUserSettings({
      id: _id,
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
    return SPOONACULAR_DIET_CHOICES.map((dietChoice) => {
      const { diet } = userSettings as Doc<'userSettings'>
      const selected = diet.includes(dietChoice[0])
      const selectedButtonClass = selected
        ? 'bg-orange-500'
        : 'border border-orange-500'
      return (
        <Pressable
          className={'mb-1 mr-1 rounded ' + selectedButtonClass}
          onPress={() => handleDietChange(dietChoice[0])}
        >
          <Text className={'p-2 ' + (selected ? 'text-white' : '')}>
            {dietChoice[1]}
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
    return SPOONACULAR_ALLERGY_CHOICES.map((intoleranceChoice) => {
      const { intolerances } = userSettings as Doc<'userSettings'>
      const selected = intolerances.includes(intoleranceChoice[0])
      const selectedButtonClass = selected
        ? 'bg-orange-500'
        : 'border border-orange-500'
      return (
        <Pressable
          className={'mb-1 mr-1 rounded ' + selectedButtonClass}
          onPress={() => handleIntoleranceChange(intoleranceChoice[0])}
        >
          <Text className={'p-2 ' + (selected ? 'text-white' : '')}>
            {intoleranceChoice[1]}
          </Text>
        </Pressable>
      )
    })
  }
  if (!userSettings) return
  return (
    <SignedIn>
      <View className="flex-1 p-4 md:p-8" accessibilityRole="main">
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
                {userSettings.numberOfRecipes}
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
