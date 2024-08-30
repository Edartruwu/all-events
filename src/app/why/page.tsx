import { Container, Main, Section } from "@/components/craft";
import Hero from "@/components/hero";
import Balancer from "react-wrap-balancer";
import Link from "next/link";

export default function Page() {
  return (
    <Main>
      <Section>
        <Container>
          <div className="relative p-7 rounded-[12px] border border-gray-300 bg-none backdrop-blur-sm">
            <Balancer>
              <h1>Por que?</h1>
              <p>
                Un poco de aburrimiento xd y no hay un lugar que centralize toda
                la data de eventos del ecosistema en un solo lugar, entonces
                decidí invertir un par de horas de mi tiempo y crear esto.
              </p>
              <h2>Como lo uso?</h2>
              <p>
                La forma de utilizarlo es super simple, solo ve{" "}
                <Link href={"/events"}>Aqui</Link> y añade tu evento haciendo
                click al botón, en unos segundos verás como tu evento ha sido
                creado y una mini pagina para que la compartas tambien!
              </p>
              <br />
              <p>
                En el caso de que no hayas añadido un video de youtube (embed)
                no se mostrará ninguna imagen :( sin embargo te recomiendo
                hacerlo para que tu evento sea más atractivo para los usuarios.
              </p>
              <h3>Nota:</h3>
              <p>
                Este es un proyecto open source, si deseas puedes contribuir :),
                en la v2 mejoraremos el SEO, puedes conocer más al respecto{" "}
                <Link href={"https://github.com/Edartruwu/all-events"}>
                  Aqui!
                </Link>
              </p>
            </Balancer>
          </div>
        </Container>
      </Section>
    </Main>
  );
}
