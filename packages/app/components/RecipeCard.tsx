import { Text } from 'app/design/typography'
import { View } from 'app/design/view'
import { SolitoImage } from 'solito/image'
import { Icon } from 'react-native-eva-icons'
import colors from 'tailwindcss/colors'

const RecipeCard = ({ recipe }) => {
  return (
    <View className="m-2 w-[45%] min-w-[125px] flex-col items-center justify-start rounded-3xl bg-white shadow sm:mx-6 sm:w-1/5">
      <View className="w-full object-cover p-1">
        <View className="absolute left-3 top-3 rounded-full bg-orange-500/75 p-1">
          <Icon
            name="unlock"
            height={18}
            width={18}
            opacity={0.75}
            fill={'white'}
          />
        </View>
        <SolitoImage
          src={recipe.image}
          width={100}
          height={100}
          alt={recipe.title}
          style={{ borderRadius: 24, width: '100%', zIndex: -1 }}
        />
      </View>
      <View className="m-2 w-full grow items-center justify-between space-y-2 p-2">
        <View className="text-wrap">
          <Text className="text-lg font-bold leading-5">{recipe.title}</Text>
        </View>
        <View className="w-full flex-row items-center justify-center">
          <Icon
            name="flash"
            width={18}
            height={18}
            fill={colors.yellow['500']}
          />
          <Text className="text-lg text-red-500">&spades;</Text>
          <Text className="text-lg text-yellow-700">&clubs;</Text>
          <Text className="text-lg text-green-700">V</Text>
          <Text className="text-lg text-green-700">&#9445;</Text>
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
