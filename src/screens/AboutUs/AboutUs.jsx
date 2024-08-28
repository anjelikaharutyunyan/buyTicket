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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum. Mauris blandit aliquet elit, eget
            tincidunt nibh pulvinar a. Donec rutrum congue leo eget malesuada.
            Nulla porttitor accumsan tincidunt. Cras ultricies ligula sed magna
            dictum porta.
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            Pellentesque in ipsum id orci porta dapibus. Nulla quis lorem ut
            libero malesuada feugiat. Vivamus suscipit tortor eget felis
            porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et,
            porttitor at sem. Praesent sapien massa, convallis a pellentesque
            nec, egestas non nisi.
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
            Sed porttitor lectus nibh. Curabitur arcu erat, accumsan id
            imperdiet et, porttitor at sem. Vestibulum ac diam sit amet quam
            vehicula elementum sed sit amet dui. Curabitur arcu erat, accumsan
            id imperdiet et, porttitor at sem. Proin eget tortor risus.
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
              src=""
              alt="Team Member 1"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
            <p>John Doe</p>
            <p>Founder & CEO</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src=""
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