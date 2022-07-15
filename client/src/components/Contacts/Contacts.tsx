import './Contacts.scss';

export const Contacts = () => {
  return (
    <section className="contacts-container">
      <div className="info-container">
        <div className="phone-icon" />
        <div>
          <div>
            <a className="contact" href="tel:+7(473)1234567">
              +7 (473) 123 45 67
            </a>
          </div>
          <div>
            <a className="contact" href="mailto:vetclinic@domain.com">
              vetclinic@domain.com
            </a>
          </div>
        </div>
      </div>

      <div className="info-container">
        <div className="location-icon" />
        <div>
          <p className="address">г. Воронеж,</p>
          <p className="address">ул. Ворошилова, д. 22</p>
        </div>
      </div>
    </section>
  );
};
