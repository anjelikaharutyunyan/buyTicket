const AboutUs = () => {
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
          <h1>About Us</h1>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            We are dedicated to providing the best ticketing services. Our platform ensures a seamless experience for finding and purchasing tickets to various events. We are committed to quality and customer satisfaction.
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            We are dedicated to providing the best ticketing services. Our platform ensures a seamless experience for finding and purchasing tickets to various events. We are committed to quality and customer satisfaction.
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            We are dedicated to providing the best ticketing services. Our platform ensures a seamless experience for finding and purchasing tickets to various events. We are committed to quality and customer satisfaction.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "lightgray",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "orange",
        }}
      >
        <h2>Our Team</h2>
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
            <p>John Doe</p>
            <p>Founder & CEO</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src="https://media.istockphoto.com/id/831902150/photo/ive-solidified-my-name-in-the-business-world.jpg?s=612x612&w=0&k=20&c=GCkoeN4GXE9W3EgNmwnInZpvGEepUSPd7N8NMKGBGFs="
              alt="Team Member 2"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
            <p>Jane Smith</p>
            <p>Chief Operating Officer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;