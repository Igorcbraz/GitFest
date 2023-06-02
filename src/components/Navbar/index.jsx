import { useWindowDimensions } from '../../hooks/useWindowDimentions'

import { Desktop } from './Desktop';
import { Mobile } from './Mobile';

export const Navbar = () => {
  const { width } = useWindowDimensions();

  return width > 768 ? <Desktop/> : <Mobile/>
}
