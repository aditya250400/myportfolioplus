import { Route, Routes, ScrollRestoration } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import ProfilePage from './pages/ProfilePage';
import PortfolioDetailPage from './pages/PortfolioDetailPage';
import SuggestedDeveloperPage from './pages/SuggestedDeveloperPage';
import { isPreloadAsync } from './states/isPreload/isPreloadThunk';
import SuggestedDeveloperLoading from './components/Loading/SuggestedDeveloperLoading';
import ProfileDetailPage from './pages/ProfileDetailPage';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isPreload } = useSelector((state) => state.isPreload);

  useEffect(() => {
    dispatch(isPreloadAsync());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  return (
    <Routes>
      {!token ? (
        <>
          <Route index element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </>
      ) : (
        <>
          <Route index element={<HomePage />} />
          <Route path="/profile/myProfile" element={<ProfilePage />} />
          <Route path="/profile/:id" element={<ProfileDetailPage />} />
          <Route path="/profile/api/post/:id" element={<ProfilePage />} />
          <Route path="/portfolio-detail/:id" element={<PortfolioDetailPage />} />
          <Route path="/most-active-users/all" element={<SuggestedDeveloperPage />} />
          <Route path="/test" element={<SuggestedDeveloperLoading />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
