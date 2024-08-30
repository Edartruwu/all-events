import { BorderBeam } from "@/components/border";
import { Container, Main, Section, Article } from "@/components/craft";
import { GetEventById } from "@/server/getEventById";
import { YouTubeEmbed } from "@next/third-parties/google";
import Link from "next/link";
import { ParseDate } from "@/lib/dates";

function extractYouTubeVideoId(iframe: string | null): string | null {
  if (typeof iframe !== "string") {
    return null;
  }
  const videoIdMatch = iframe.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  return videoIdMatch ? videoIdMatch[1] : null;
}

function Video({ videoId }: { videoId: string | null }) {
  if (videoId) {
    return (
      <div>
        <YouTubeEmbed videoid={videoId} height={500} width={700}></YouTubeEmbed>
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
  const fecha = ParseDate(evento?.startingDate!);
  return (
    <Main>
      <Section>
        <Container>
          <div className="relative flex flex-col items-center p-7 rounded-[12px] border border-gray-300 bg-none backdrop-blur-sm">
            <h1>{evento?.eventName || "Evento No Encontrado"}</h1>
            <Video videoId={videoId} />
            <h3>Descripción del evento</h3>
            <Article className="my-3 prose lg:prose-xl">
              {evento?.description}
            </Article>
            <div className="flex flex-col md:flex-row gap-3">
              <Link href={evento?.place!}>Lugar del evento</Link>
              <p>Hora: {evento?.startingHour}</p>
              <p>Fecha: {fecha}</p>
            </div>
            <Link href={evento?.eventHref!}>
              <div className="my-4 relative flex items-center justify-center p-4 rounded-[30px] border border-gray-300">
                {evento?.CTA}
                <BorderBeam size={50} />
              </div>
            </Link>

            <BorderBeam size={300} borderWidth={3} />
          </div>
        </Container>
      </Section>
    </Main>
  );
}
