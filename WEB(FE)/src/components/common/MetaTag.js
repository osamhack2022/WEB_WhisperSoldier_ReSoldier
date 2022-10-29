import { Helmet } from "react-helmet-async";

const MetaTag = () => {
  return (
    <Helmet>
      <title>Whisper Soldier</title>

      <meta name="description" content="익명 군 상담소 Whisper Soldier" />
      <meta name="keywords" content="소통" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="Whisper Soldier" />
      <meta property="og:site_name" content="Whisper Soldier" />
      <meta
        property="og:description"
        content="익명 군 상담소 Whisper Soldier"
      />
      <meta
        property="og:image"
        content="https://firebasestorage.googleapis.com/v0/b/whisper-soldier-database.appspot.com/o/asset%2Flogo.png?alt=media&token=1ebbf74d-04fd-476f-b7e1-f6b176d22288"
      />
      <meta property="og:url" content="http://whispersoldier.site/" />

      <meta name="twitter:title" content="Whisper Soldier" />
      <meta
        name="twitter:description"
        content="익명 군 상담소 Whisper Soldier"
      />
      <meta
        name="twitter:image"
        content="https://firebasestorage.googleapis.com/v0/b/whisper-soldier-database.appspot.com/o/asset%2Flogo.png?alt=media&token=1ebbf74d-04fd-476f-b7e1-f6b176d22288"
      />

      <link rel="canonical" href="http://whispersoldier.site/" />
    </Helmet>
  );
};

export default MetaTag;
