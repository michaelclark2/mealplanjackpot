import Quick from 'app/icons/Quick'
import DairyFree from 'app/icons/DairyFree'
import GlutenFree from 'app/icons/GlutenFree'
import Vegetarian from 'app/icons/Vegetarian'
import Vegan from 'app/icons/Vegan'
import { View } from 'app/design/view'
import { Text } from 'app/design/typography'
import colors from 'tailwindcss/colors'
import { useState } from 'react'
import { Pressable } from 'app/design/button'
import { Row } from 'app/design/layout'

export default function Legend() {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <Pressable
      className={`my-2 flex flex-row flex-wrap items-center justify-center rounded-3xl  bg-slate-200 p-2 ${
        isOpen && 'py-0.5'
      }`}
      onPress={() => setIsOpen(!isOpen)}
    >
      <Text className="mb-2 text-xs font-bold sm:mb-0">Legend</Text>
      {isOpen && (
        <View className="ml-2 flex flex-row flex-wrap items-center justify-center space-x-2 space-y-2 sm:space-y-0">
          <Row className="mt-1 space-x-2 rounded-3xl bg-white p-1 sm:mt-0">
            <Quick width={18} height={18} fill={colors.yellow['500']} />
            <Text className="text-xs">Quick</Text>
          </Row>
          <Row className="mt-1 space-x-2 rounded-3xl bg-white p-1 sm:mt-0">
            <DairyFree width={18} height={18} fill={colors.red['500']} />
            <Text className="text-xs">Dairy Free</Text>
          </Row>
          <Row className="mt-1 space-x-2 rounded-3xl bg-white p-1 sm:mt-0">
            <GlutenFree width={18} height={18} fill={colors.yellow['700']} />
            <Text className="text-xs">Gluten Free</Text>
          </Row>
          <Row className="mt-1 space-x-2 rounded-3xl bg-white p-1 sm:mt-0">
            <Vegetarian width={18} height={18} fill={colors.green['700']} />
            <Text className="text-xs">Vegetarian</Text>
          </Row>
          <Row className="mt-1 space-x-2 rounded-3xl bg-white p-1 sm:mt-0">
            <Vegan width={18} height={18} fill={colors.green['700']} />
            <Text className="text-xs">Vegan</Text>
          </Row>
        </View>
      )}
    </Pressable>
  )
}
