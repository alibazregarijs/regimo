import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import { AppDispatch, RootState } from "./store";

type DispatchFuntion = () => AppDispatch;

export const useRegimeDispatch: DispatchFuntion = useDispatch;
export const useRegimeSelector: TypedUseSelectorHook<RootState> = useSelector;

// collection 

export const useCollectionDispatch: DispatchFuntion = useDispatch;
export const useCollectionSelector: TypedUseSelectorHook<RootState> = useSelector;