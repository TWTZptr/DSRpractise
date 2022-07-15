import React from 'react';
import './Homepage.scss';
import { SignButton } from '../../components/SignButton/SignButton';
import { Contacts } from '../../components/Contacts/Contacts';
import { Logo } from '../../components/Logo/Logo';

export const Homepage = () => {
  return (
    <>
      <header>
        <Logo />
        <Contacts />
        <SignButton />
      </header>
      <main>Clinic info</main>
      <footer></footer>
    </>
  );
};
