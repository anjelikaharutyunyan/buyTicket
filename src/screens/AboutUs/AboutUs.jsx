import { useTranslation } from "react-i18next";
import "./AboutUs.css"; 

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <h1 className="about-us-title">{t('aboutUs')}</h1>
        <p className="about-us-welcome-text">{t('welcomeText')}</p>
      </header>

      <section className="about-us-mission">
        <h2 className="about-us-subtitle">{t('ourMission')}</h2>
        <p>{t('missionText')}</p>
      </section>

      <section className="about-us-reasons">
        <h2 className="about-us-subtitle">{t('whyChooseUs')}</h2>
        <ul className="about-us-reasons-list">
          <li>{t('comprehensiveListings')}</li>
          <li>{t('secureTransactions')}</li>
          <li>{t('exceptionalSupport')}</li>
          <li>{t('exclusiveOffers')}</li>
        </ul>
      </section>

      <section className="about-us-commitment">
        <h2 className="about-us-subtitle">{t('ourCommitment')}</h2>
        <p>{t('commitmentText')}</p>
      </section>

      <section className="about-us-join">
        <h2 className="about-us-subtitle">{t('joinUs')}</h2>
        <p>{t('joinUsText')}</p>
        <p>{t('thankYou')}</p>
      </section>

      <section className="about-us-team">
        <h2 className="about-us-subtitle">{t('ourTeam')}</h2>
        <div className="team-member-container">
          <div className="team-member">
            <img
              src="https://www.shutterstock.com/image-photo/happy-middle-aged-business-man-600nw-2306186897.jpg"
              alt="Team Member 1"
              className="team-member-image"
            />
            <p className="team-member-name">{t('founderName')}</p>
            <p className="team-member-role">{t('founderCEO')}</p>
          </div>
          <div className="team-member">
            <img
              src="https://media.istockphoto.com/id/831902150/photo/ive-solidified-my-name-in-the-business-world.jpg?s=612x612&w=0&k=20&c=GCkoeN4GXE9W3EgNmwnInZpvGEepUSPd7N8NMKGBGFs="
              alt="Team Member 2"
              className="team-member-image"
            />
            <p className="team-member-name">{t('chiefName')}</p>
            <p className="team-member-role">{t('chief')}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
