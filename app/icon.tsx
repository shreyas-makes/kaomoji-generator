import type { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 9,
          background: "white",
          color: "black",
        }}
      >
        {"¯\\_(ツ)_/¯"}
      </div>
    ),
    size
  );
}
