import Link from "next/link";
import Image from "next/image";

import Balancer from "react-wrap-balancer";
import { PartyPopper } from "lucide-react";

import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "./border";

export default function Hero() {
  return (
    <Section>
      <Container className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center text-center p-3 rounded-[12px] border border-gray-300 bg-none backdrop-blur-sm">
          <Image
            src={"/AllEventsLogo.svg"}
            width={244}
            height={144}
            alt="main logo"
            className="object-cover not-prose mb-6 dark:invert md:mb-8 pt-5"
          />
          <h1 className="!mb-0">
            <Balancer>
              Todos los eventos del ecosistema en un solo sitio!
            </Balancer>
          </h1>
          <h3 className="text-muted-foreground">
            <Balancer>
              No encontrabamos todos los eventos del ecosistema startup en perú
              en un solo sitio así que lo creamos! Sube tu evento y comparte el
              link!
            </Balancer>
          </h3>
          <BorderBeam size={300} borderWidth={3} />
        </div>
        <div className="not-prose mt-6 flex gap-2 md:mt-12">
          <Button asChild>
            <Link
              prefetch={true}
              href="/events"
              className="flex flex-row items-center justify-center gap-2"
            >
              <PartyPopper />
              <p>Sube tu evento</p>
            </Link>
          </Button>
          <Button variant={"outline"} asChild>
            <Link prefetch={true} href="/why">
              Conoce más -{">"}
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
