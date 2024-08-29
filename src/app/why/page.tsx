import { Container, Main, Section } from "@/components/craft";
import Hero from "@/components/hero";
import Balancer from "react-wrap-balancer";

export default function Page() {
  return (
    <Main>
      <Section>
        <Container>
          <Balancer>
            <h1>La iniciativa</h1>
          </Balancer>
        </Container>
      </Section>
    </Main>
  );
}
