import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "100px",
        justifyContent: "center",
        paddingInline: "40px",
        gap: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>{t('aboutUs')}</h1>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            {t('welcomeText')}
          </p>
          <h2>{t('ourMission')}</h2>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            {t('missionText')}
          </p>
          <h2>{t('whyChooseUs')}</h2>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            {t('comprehensiveListings')}
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            {t('secureTransactions')}
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            {t('exceptionalSupport')}
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            {t('exclusiveOffers')}
          </p>
          <h2>{t('ourCommitment')}</h2>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            {t('commitmentText')}
          </p>
          <h2>{t('joinUs')}</h2>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            {t('joinUsText')}
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            {t('thankYou')}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "orange",
        }}
      >
        <h2>{t('ourTeam')}</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "30px",
            color: "black",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src="https://www.shutterstock.com/image-photo/happy-middle-aged-business-man-600nw-2306186897.jpg"
              alt="Team Member 1"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
            <p>{t('founderName')}</p>
            <p>{t('founderCEO')}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src="https://media.istockphoto.com/id/831902150/photo/ive-solidified-my-name-in-the-business-world.jpg?s=612x612&w=0&k=20&c=GCkoeN4GXE9W3EgNmwnInZpvGEepUSPd7N8NMKGBGFs="
              alt="Team Member 2"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
            <p>{t('chiefName')}</p>
            <p>{t('chief')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;