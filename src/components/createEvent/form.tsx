"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { CreateNewEvent } from "@/server/createEvent";

const youtubeEmbedIframeSchema = z.string().refine(
  (value) => {
    const regex =
      /<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+[^"]*"[^>]*><\/iframe>/;
    return regex.test(value);
  },
  {
    message:
      "Iframe incertado es invalido, por favor ingresa un iframe de youtube embed",
  },
);

const forbiddenPatterns = [
  /wa\.me/, // Matches WhatsApp short links
  /whatsapp\.com/, // Matches WhatsApp full links
  /discord\.gg/, // Matches Discord invite links
  /discord\.com/, // Matches Discord URLs
  /t\.me/, // Matches Telegram short links
  /telegram\.me/, // Matches Telegram full links
];

const formSchema = z.object({
  eventName: z.string({ message: "Ingresa un Nombre para tu evento" }),
  description: z.string({
    message:
      "Ingresa una Descripción para tu evento, recuerda que soportamos markdown :)",
  }),
  eventHref: z
    .string({
      message: "Ingresa un link de registro para tu evento",
    })
    .url({ message: "Ingresa una url valida" })
    .refine((url) => !forbiddenPatterns.some((pattern) => pattern.test(url)), {
      message: "URLs de WhatsApp, Discord, o Telegram no estan permitidas.",
    }),
  creator: z.string({ message: "Ingresa un nombre de creador para tu evento" }),
  startingDate: z.date({
    message: "Ingresa una fecha de inicio para tu evento",
  }),
  startingHour: z.string({
    message: "Ingresa una hora de comienzo para tu evento",
  }),
  place: z
    .string({ message: "Ingresa un link de google maps!" })
    .url({ message: "Ingresa una url valida" }),
  CTA: z.string().max(25).optional(),
  videoId: youtubeEmbedIframeSchema.optional(),
});

export default function CreateEventForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await CreateNewEvent(values);
      toast({
        title: "Evento Creado!",
        description: `${values.eventName} fue creado!`,
      });
    } catch (error) {
      toast({
        description: `${error}`,
      });
    } finally {
      await form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 m-2 mt-2 mb-2"
      >
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingresa el nombre de tu evento</FormLabel>
              <FormControl>
                <Input placeholder="Tech..." {...field} />
              </FormControl>
              <FormDescription>
                Recuerda que un buen nombre tiene que ser fácil de recordar,
                breve y que transmita la temática.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción del evento</FormLabel>
              <FormControl>
                <Textarea placeholder="Este evento trata sobre..." {...field} />
              </FormControl>
              <FormDescription>
                Proporciona una descripción detallada, incluyendo la temática y
                el formato del evento.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventHref"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enlace de registro</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormDescription>
                Proporciona un enlace para que los participantes se registren.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="creator"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del creador</FormLabel>
              <FormControl>
                <Input placeholder="Pepito/Comunidad?..." {...field} />
              </FormControl>
              <FormDescription>
                Indica quién está organizando este evento.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startingDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de inicio</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] ml-2 pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Selecciona la fecha en la que se llevará a cabo el evento.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startingHour"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hora de inicio</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormDescription>
                Indica la hora a la que comenzará el evento.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="place"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lugar del evento</FormLabel>
              <FormControl>
                <Input placeholder="https://googlemaps...." {...field} />
              </FormControl>
              <FormDescription>
                Indica el lugar del evento utilizando una url de google maps.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="CTA"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Texto del botón de llamada a la acción (CTA) (opcional)
              </FormLabel>
              <FormControl>
                <Input placeholder="Regístrate ahora" {...field} />
              </FormControl>
              <FormDescription>
                Escribe el contenido para un botón que motive a los usuarios a
                participar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="videoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                iFrame de Youtube (opcional pero recomendable)
              </FormLabel>
              <FormControl>
                <Input placeholder="<iframe src=..." {...field} />
              </FormControl>
              <FormDescription>
                Si tienes un video promocional, incluye su ID aquí. aun no
                soportamos fotos :(
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2 w-full" type="submit">
          Crear Evento
        </Button>
      </form>
    </Form>
  );
}
