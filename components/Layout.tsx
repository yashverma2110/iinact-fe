import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Routes from '../metadata/Route';
import Tooltip from './Tooltip';
import Modal from './Modal';
import { FormHandler } from './FormHandler';
import { LoginFormMetadata } from '../metadata/form/auth.metadata';

interface LayoutProps {
  children: any;
}

const Layout = ({ children }: LayoutProps) => {
  const [isAuthModalShowing, setIsAuthModalShowing] = useState<boolean>(false);

  const handleSignup = () => {};

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
        title="Sign up"
        subtitle="Join us to start the journey"
        size="md"
        isShowing={isAuthModalShowing}
        setIsShowing={setIsAuthModalShowing}
      >
        <FormHandler
          context={LoginFormMetadata}
          buttonTitle="Sign Up"
          onSubmit={(data) => console.log('form', data)}
        />
      </Modal>
    </div>
  );
};

export default Layout;
