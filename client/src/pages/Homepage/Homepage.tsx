import './Homepage.scss';
import { SignButton } from '../../components/SignButton/SignButton';
import { Contacts } from '../../components/Contacts/Contacts';
import { Logo } from '../../components/Logo/Logo';
import { MainInfo } from '../../components/MainInfo/MainInfo';

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
        <p>
          Появились вопросы? <b>Звоните!</b>
        </p>
        <p>
          <a className="contact" href="tel:+7(473)1234567">
            <b>+7 (473) 123 45 67</b>
          </a>
        </p>
        <p>Или обращайтесь по адресу:</p>
        <p>
          <b>г. Воронеж, ул. Ворошилова, д. 22</b>
        </p>
        <div>
          <i>DSR practice 2022</i>
        </div>
      </footer>
    </>
  );
};
