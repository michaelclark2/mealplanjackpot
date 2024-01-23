import { Pressable } from 'react-native'
import { styled } from 'nativewind'

export const Button = styled(
  Pressable,
  'bg-green-500 flex justify-center rounded-md p-3',
)

export const SpinButton = styled(
  Pressable,
  'bg-orange-500 rounded-full justify-center items-center w-24 h-24',
)
