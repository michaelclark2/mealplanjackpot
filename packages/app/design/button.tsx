import { Pressable as ReactNativePressable } from 'react-native'
import { styled } from 'nativewind'

export const Button = styled(
  ReactNativePressable,
  'bg-green-500 flex justify-center rounded-md p-3',
)

export const SpinButton = styled(
  ReactNativePressable,
  'bg-orange-500 rounded-full justify-center items-center w-24 h-24',
)

export const Pressable = styled(ReactNativePressable)
