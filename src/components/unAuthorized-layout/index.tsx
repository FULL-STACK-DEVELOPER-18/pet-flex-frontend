import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { routeConstant } from '../../constants/routes';
import { getLocalStorageItem } from '../../utils/local-storage';

export const UnAuthorizedLayout = () => {
  const navigate = useNavigate();
  const isAuthorized = getLocalStorageItem('token');
  if (isAuthorized) {
    navigate(`${routeConstant.app.clientPets.path}`);
  }

  return !isAuthorized ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate replace to={routeConstant.app.clientPets.path} />
  );
};
