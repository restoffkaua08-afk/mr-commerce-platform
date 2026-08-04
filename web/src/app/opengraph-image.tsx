import { ImageResponse } from "next/og";

export const alt = "MR — A visão de hoje constrói o amanhã";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 18% 25%, #3a2d1f 0%, #151310 32%, #08090b 72%)",
          color: "#f5e4c2",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            left: -190,
            bottom: -260,
            borderRadius: "50%",
            border: "3px solid rgba(202, 160, 94, 0.38)",
            boxShadow:
              "0 0 90px rgba(202, 160, 94, 0.20), inset 0 0 70px rgba(0, 0, 0, 0.75)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 900,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 190,
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: "-18px",
              color: "#ddb878",
              textShadow: "0 10px 40px rgba(221, 184, 120, 0.25)",
            }}
          >
            MR
          </div>

          <div
            style={{
              width: 410,
              height: 2,
              marginTop: 18,
              marginBottom: 30,
              background:
                "linear-gradient(90deg, transparent, #ddb878, transparent)",
            }}
          />

          <div
            style={{
              display: "flex",
              fontSize: 43,
              lineHeight: 1.25,
              textAlign: "center",
              letterSpacing: "1px",
              color: "#f3eadc",
            }}
          >
            A visão de hoje constrói o amanhã.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 19,
              letterSpacing: "5px",
              textTransform: "uppercase",
              color: "rgba(243, 234, 220, 0.62)",
            }}
          >
            Curadoria inteligente
          </div>
        </div>
      </div>
    ),
    size,
  );
}
