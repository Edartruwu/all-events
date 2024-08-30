import { Container, Main, Section } from "@/components/craft";
import { GetEventById } from "@/server/getEventById";
import { YouTubeEmbed } from "@next/third-parties/google";

function extractYouTubeVideoId(iframe: string): string | null {
  const videoIdMatch = iframe.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  return videoIdMatch ? videoIdMatch[1] : null;
}

function Video({ videoId }: { videoId: string | null }) {
  if (videoId) {
    return (
      <div>
        <YouTubeEmbed
          videoid={videoId}
          params="controls=0"
          height={500}
          width={700}
        ></YouTubeEmbed>
      </div>
    );
  }
  return null;
}

export default async function Page({
  params,
}: {
  params: { eventId: string };
}) {
  const evento = await GetEventById(params.eventId);

  const iframe = evento?.videoId!;
  const videoId = extractYouTubeVideoId(iframe);

  return (
    <Main>
      <Section>
        <Container>
          <div className="flex flex-col items-center text-center p-3 rounded-[12px] border border-gray-300 bg-none backdrop-blur-sm">
            <h1>{evento?.eventName || "Evento No Encontrado"}</h1>
            <Video videoId={videoId} />
          </div>
        </Container>
      </Section>
    </Main>
  );
}
