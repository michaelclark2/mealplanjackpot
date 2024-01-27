import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { SolitoImage } from 'solito/image'
import { Icon } from 'react-native-eva-icons'
import colors from 'tailwindcss/colors'
import { Pressable } from 'app/design/button'
import { ActivityIndicator, Linking } from 'react-native'

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
  lockRecipe,
}: {
  recipe: SpoonacularRecipe
  lockRecipe: (recipe: SpoonacularRecipe) => void
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
  const renderBadges = () => {
    const badges = []
    if (recipe.vegan)
      badges.push(
        <Text key="vegan" className="text-lg text-green-700">
          &#9445;
        </Text>,
      )
    if (recipe.vegetarian && !recipe.vegan)
      badges.push(
        <Text key="vegetarian" className="text-lg text-green-700">
          V
        </Text>,
      )
    if (recipe.readyInMinutes <= 30)
      badges.push(
        <Icon
          key="quick"
          name="flash"
          width={18}
          height={18}
          fill={colors.yellow['500']}
        />,
      )
    if (recipe.dairyFree)
      badges.push(
        <Text key="dairyfree" className="text-lg text-red-500">
          &spades;
        </Text>,
      )
    if (recipe.glutenFree)
      badges.push(
        <Text key="glutenfree" className="text-lg text-yellow-700">
          &clubs;
        </Text>,
      )
    return badges
  }
  const lockedStyles =
    ' ' +
    (recipe.locked
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
        onPress={() => lockRecipe(recipe)}
      >
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
        <SolitoImage
          src={recipe?.image}
          width={100}
          height={100}
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
          {renderBadges()}
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
