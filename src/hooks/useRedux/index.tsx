import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../redux/store/store' 
import type { TypedUseSelectorHook } from 'react-redux'

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector