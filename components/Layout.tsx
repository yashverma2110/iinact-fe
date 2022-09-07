import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Routes from '../metadata/Route';
import Tooltip from './Tooltip';
import Modal from './Modal';
import { FormHandler } from './FormHandler';
import {
  LoginFormMetadata,
  SignupFormMetadata,
} from '../metadata/form/auth.metadata';
import Constants from '../config/constants';
import LocalStorage from '../utils/localStorage';
import { useDispatch } from 'react-redux';
import authActions from '../redux/actions/auth.actions';
import AuthService from '../services/AuthService';

interface LayoutProps {
  children: any;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
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
    if (isForLogin) {
      const { success, data, error } = await AuthService.logIn(user);
      if (success) {
        LocalStorage.setAuthToken(data.token);
        dispatch(authActions.logIn(data));
        setIsAuthModalShowing(false);
      }
      return;
    }

    dispatch(authActions.signUp(user));
  };

  return (
    <div className="h-screen w-screen flex">
      <aside className="flex flex-col justify-center h-full sidebar rounded-r-xl">
        {Routes.map((route) => (
          <Link key={route.displayName} href={route.route}>
            <a className="w-fit p-4 hover:shadow-inner">
              <Tooltip title={route.displayName} position="right" size="xl">
                <FontAwesomeIcon
                  className="text-gray-50 text-2xl"
                  icon={route.icon}
                />
              </Tooltip>
            </a>
          </Link>
        ))}
      </aside>
      <div className="w-full flex flex-col">
        <header className="px-4 py-2">Header</header>
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
