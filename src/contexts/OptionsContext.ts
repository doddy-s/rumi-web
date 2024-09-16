import { createContext } from 'react'

export type OptionsContext = {
  richPresenceIsAvailable: boolean
  richPresenceIsEnable: boolean
  setRichPresenceIsEnable: (richPresenceIsEnable: boolean) => void
}

export const OptionsContext = createContext<OptionsContext>({
  richPresenceIsAvailable: false,
  richPresenceIsEnable: false,
  setRichPresenceIsEnable: () => {}
})