import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Routes from '../metadata/Route';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import { FormHandler } from './FormHandler';
import {
  LoginFormMetadata,
  SignupFormMetadata,
} from '../metadata/form/auth.metadata';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Constants from '../config/constants';
import LocalStorage from '../utils/localStorage';
import authActions from '../redux/actions/auth.actions';
import AuthService from '../services/AuthService';

interface LayoutProps {
  children: any;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { firstName, lastName, email } = useSelector(
    (state: any) => state.auth
  );
  const [isAuthModalShowing, setIsAuthModalShowing] = useState<boolean>(false);
  const [isForLogin, setisForLogin] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      if (Constants.AUTH_ROUTES.includes(router.pathname)) {
        if (!LocalStorage.isAuthenticated()) {
          setIsAuthModalShowing(true);
          return;
        }

        const { success, data, error } = await AuthService.getUserDetails();

        if (success) {
          dispatch(
            authActions.logIn({ ...data, token: LocalStorage.getAuthToken() })
          );
          return;
        }

        setIsAuthModalShowing(true);
        LocalStorage.clear();
      }
    })();
  }, [router.pathname, dispatch]);

  const handleSubmit = async (user: any) => {
    // TODO: Handle a good way for error display
    if (isForLogin) {
      const { success, data, error } = await AuthService.logIn(user);
      if (success) {
        LocalStorage.setAuthToken(data.token);
        dispatch(authActions.logIn(data));
        setIsAuthModalShowing(false);
      }
      return;
    }
    const { success, data, error } = await AuthService.signUp(user);

    if (success) {
      LocalStorage.setAuthToken(data.token);
      dispatch(authActions.signUp(data));
      setIsAuthModalShowing(false);
    }
  };

  return (
    <div
      className={`h-screen w-screen flex ${
        email ? '' : isAuthModalShowing ? 'no-auth-bg' : ''
      }`}
    >
      {email && (
        <aside className="sidebar flex flex-col h-full shadow-xl">
          <div className="h-1/5 flex flex-col justify-center px-2">
            <div className="flex justify-center mb-2">
              <div className="h-14 w-14 rounded-full bg-red-50 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUser}
                  size="1x"
                  className="text-gray-400"
                />
              </div>
            </div>

            <div className="text-white font-semibold text-center">
              {firstName}
              &nbsp;
              {lastName}
            </div>
            <div className="bg-white rounded-lg mt-2 text-black text-xxs p-1">
              {email}
            </div>
          </div>

          {Routes.map((route) => (
            <Link key={route.displayName} href={route.route}>
              <a className="w-full px-2 py-4 text-white hover:bg-white hover:text-black flex items-center">
                <FontAwesomeIcon
                  icon={route.icon}
                  size="lg"
                  className="w-1/3"
                />
                <div className="font-semibold text-lg ml-2 w-2/3">
                  {route.displayName}
                </div>
              </a>
            </Link>
          ))}
        </aside>
      )}

      <div className="w-full flex flex-col">
        <main className="p-4">{children}</main>
      </div>

      <Modal
        title={isForLogin ? 'Log In' : 'Sign Up'}
        subtitle={isForLogin ? 'Welcome back!' : 'Join us to start the journey'}
        size="md"
        isShowing={isAuthModalShowing}
        setIsShowing={setIsAuthModalShowing}
      >
        <>
          <FormHandler
            context={isForLogin ? LoginFormMetadata : SignupFormMetadata}
            buttonTitle="Submit"
            onSubmit={handleSubmit}
          />
          <div className="flex justify-center mt-2">
            <button
              className="text-xs tracking-tighter"
              onClick={() => setisForLogin(!isForLogin)}
            >
              {isForLogin
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Log In'}
            </button>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default Layout;
