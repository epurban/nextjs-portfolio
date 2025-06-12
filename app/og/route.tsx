import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title") || "Portfolio";

  // Load the avatar image
  const avatarData = await fetch(new URL("/avatar.jpeg", url.origin)).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
        <div tw="flex flex-col items-center justify-center p-8">
          <div tw="flex flex-row items-center gap-12 mb-8">
            <img src={avatarData as any} width={120} height={120} alt="Edward Urban Avatar" style={{ borderRadius: "50%", marginRight: "12px" }} />
            <h1 tw="text-6xl font-semibold tracking-tighter">Edward Urban</h1>
          </div>
          <h2 tw="text-4xl font-semibold tracking-tight text-center">{title}</h2>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
