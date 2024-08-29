import { Container, Main, Section } from "@/components/craft";

export default function Page({ params }: { params: { eventId: string } }) {
  return (
    <Main>
      <Section>
        <Container>
          <h1>Evento: {params.eventId}</h1>
        </Container>
      </Section>
    </Main>
  );
}
