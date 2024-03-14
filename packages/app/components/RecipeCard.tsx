import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { SolitoImage } from 'solito/image'
import { Icon } from 'react-native-eva-icons'
import Quick from 'app/icons/Quick'
import DairyFree from 'app/icons/DairyFree'
import GlutenFree from 'app/icons/GlutenFree'
import Vegetarian from 'app/icons/Vegetarian'
import Vegan from 'app/icons/Vegan'
import colors from 'tailwindcss/colors'
import { Pressable } from 'app/design/button'
import { ActivityIndicator, Linking, Platform } from 'react-native'

const renderBadges = (recipe: SpoonacularRecipe) => {
  const badges = []
  if (recipe.vegan)
    badges.push(<Vegan key="vegan" fill={colors.green['700']} />)
  if (recipe.vegetarian && !recipe.vegan)
    badges.push(<Vegetarian key="vegetarian" fill={colors.green['700']} />)
  if (recipe.readyInMinutes <= 30)
    badges.push(
      <Quick key="quick" width={18} height={18} fill={colors.yellow['500']} />,
    )
  if (recipe.dairyFree)
    badges.push(
      <DairyFree
        height={18}
        width={18}
        key="dairyfree"
        fill={colors.red['500']}
      />,
    )
  if (recipe.glutenFree)
    badges.push(
      <GlutenFree
        key="glutenfree"
        width={18}
        height={18}
        fill={colors.yellow['700']}
      />,
    )
  return badges
}

export interface SpoonacularRecipe {
  id: number
  title: string
  sourceUrl: string
  sourceName: string
  image: string
  vegan: boolean
  vegetarian: boolean
  dairyFree: boolean
  glutenFree: boolean
  readyInMinutes: number
  locked?: boolean
  loading?: boolean
}

const RecipeCard = ({
  recipe,
  action,
  showLocked,
}: {
  recipe: SpoonacularRecipe
  action?: (recipe: SpoonacularRecipe) => void
  showLocked?: boolean
}) => {
  const viewRecipeURL = () => {
    Linking.canOpenURL(recipe.sourceUrl).then((supported) => {
      if (supported) {
        Linking.openURL(recipe.sourceUrl)
      } else {
        console.log('Cannot open url for some reason')
      }
    })
  }

  const lockedStyles =
    ' ' +
    (showLocked && recipe.locked
      ? 'sm:outline sm:outline-blue-500 border-2 border-blue-500 sm:border-0'
      : '')

  if (recipe.loading) {
    return (
      <View className="m-2 min-h-[300px] w-[45%] min-w-[125px] flex-col items-center justify-center rounded-3xl bg-white shadow sm:mx-6 sm:w-1/5">
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <View
      className={
        'min-h-52 m-2 w-[45%] min-w-[125px] flex-col items-center justify-start rounded-3xl bg-white shadow sm:mx-6 sm:w-1/5' +
        lockedStyles
      }
    >
      <Pressable
        className="w-full object-cover p-1"
        onPress={() => (action ? action(recipe) : viewRecipeURL())}
      >
        {showLocked && (
          <View
            className={
              'absolute left-3 top-3 rounded-full p-1 ' +
              (recipe.locked ? 'bg-orange-500' : 'bg-orange-500/75')
            }
          >
            <Icon
              name={recipe.locked ? 'lock' : 'unlock'}
              height={18}
              width={18}
              opacity={recipe.locked ? 1 : 0.75}
              fill={'white'}
            />
          </View>
        )}
        <SolitoImage
          src={recipe?.image}
          width={Platform.OS === 'web' ? 300 : 100}
          height={Platform.OS === 'web' ? 300 : 100}
          alt={recipe.title}
          contentFit="cover"
          contentPosition="center"
          style={{ borderRadius: 24, width: '100%', zIndex: -1 }}
        />
      </Pressable>
      <View className="m-2 w-full grow items-center justify-between space-y-2 p-2">
        <Pressable className="text-wrap" onPress={() => viewRecipeURL()}>
          <Text className="text-lg font-bold leading-5">{recipe.title}</Text>
        </Pressable>
        <View className="w-full flex-row items-center justify-center space-x-2">
          {renderBadges(recipe)}
        </View>
        <View className="grow items-center justify-end sm:flex-row sm:items-end">
          <View className="mr-1 flex-row items-center justify-center">
            <Icon
              name="clock-outline"
              width={12}
              height={12}
              fill={colors.orange['500']}
              className="mr-1"
            />
            <Text className="text-xs text-slate-500 sm:pr-2">
              {recipe.readyInMinutes}min
            </Text>
          </View>
          <Text className="hidden text-slate-300 sm:inline">&bull;</Text>
          <Text className="mt-1 text-center text-[8px] text-slate-500 sm:ml-2 sm:mt-0 sm:text-xs ">
            {recipe.sourceName}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default RecipeCard
