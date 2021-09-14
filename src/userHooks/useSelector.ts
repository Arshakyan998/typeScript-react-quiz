import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../redux/root';


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
