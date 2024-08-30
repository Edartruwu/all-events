import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BorderBeam } from "../border";
import CreateEventForm from "./form";

export default function CreateEventButton() {
  return (
    <Dialog>
      <DialogTrigger>Crea tu evento -{">"}</DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-[75vh] w-full">
        <DialogHeader>
          <DialogTitle>Llena todos los campos para crear tu evento</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] w-full px-2">
          <CreateEventForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
