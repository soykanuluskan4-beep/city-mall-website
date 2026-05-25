import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const runtime = "edge";

export const alt = "CityMall Cyprus";
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
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f9fafb",
          color: "#111827",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "24px",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "24px",
              overflow: "hidden",
              border: "1px solid #e5e7eb",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
<img
  src={`${siteConfig.url}/citymall-logo.png`}
  alt="CityMall Cyprus"
  width="72"
  height="72"
  style={{
    objectFit: "contain",
  }}
/>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                fontWeight: 700,
              }}
            >
              CityMall Cyprus
            </div>

            <div
              style={{
                marginTop: "8px",
                fontSize: "24px",
                color: "#6b7280",
              }}
            >
              Gazimağusa · Famagusta
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "78px",
              lineHeight: "1",
              fontWeight: 800,
              maxWidth: "920px",
            }}
          >
            Gazimağusa&apos;nın buluşma noktası.
          </div>

          <div
            style={{
              marginTop: "28px",
              fontSize: "34px",
              lineHeight: "1.25",
              color: "#374151",
              maxWidth: "820px",
            }}
          >
            Famagusta&apos;s meeting point.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "22px",
            color: "#6b7280",
          }}
        >
          <div>Shopping · Dining · Cinema · Events</div>
          <div>city-mall-website.vercel.app</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}