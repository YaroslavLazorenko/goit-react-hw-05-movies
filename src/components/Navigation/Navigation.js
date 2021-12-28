import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../consts';

export default function Navigation() {
  return (
    <nav>
      <NavLink to={ROUTES.HOME}>Home</NavLink>
      <NavLink to={`/${ROUTES.MOVIES}`}>Movies</NavLink>
    </nav>
  );
}
