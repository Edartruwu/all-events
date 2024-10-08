import { Container, Main, Section } from "@/components/craft";
import CreateEventButton from "@/components/createEvent/createEventButton";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { GetEvents } from "@/server/getEvents";
import { BorderBeam } from "@/components/border";

export default async function Page() {
  const data = await GetEvents();

  return (
    <Main>
      <Section>
        <Container>
          <h1>Todos los eventos del ecosistema emprendedor!</h1>
          <div className="flex flex-col gap-6">
            <div className="relative w-fit p-3 rounded-3xl border border-gray-300 backdrop-blur-sm">
              <CreateEventButton />
              <BorderBeam size={50} borderWidth={2} />
            </div>
            <div className="p-3 rounded-3xl border border-gray-300 backdrop-blur-sm">
              <DataTable data={data} columns={columns} />
            </div>
          </div>
        </Container>
      </Section>
    </Main>
  );
}
