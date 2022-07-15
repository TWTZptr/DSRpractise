import './Homepage.scss';
import { SignButton } from '../../components/SignButton/SignButton';
import { Contacts } from '../../components/Contacts/Contacts';
import { Logo } from '../../components/Logo/Logo';
import { MainInfo } from '../../components/MainInfo/MainInfo';
import { FooterInfo } from '../../components/FooterInfo/FooterInfo';

export const Homepage = () => {
  return (
    <>
      <header>
        <Logo />
        <Contacts />
        <SignButton />
      </header>
      <main>
        <MainInfo />
      </main>
      <footer>
        <FooterInfo />
      </footer>
    </>
  );
};
