import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import type { Event } from "@/types/event";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Guest } from "@/types/guest";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Event',
        href: '/event',
    },
];
export default function SingleEventPage() {

    const { event, guests, guestsCount, guestsAttendingCount, guestsNotAttendingCount } = usePage<{ event: Event; guests: Guest[]; guestsCount: number; guestsAttendingCount: number; guestsNotAttendingCount: number }>().props;
    const handleCopy = (urlProvided: string) => {
        const url = urlProvided;
        navigator.clipboard.writeText(url)
            .then(() => {
                toast("Enlace copiado", {
                    description: "La URL se ha copiado al portapapeles.",
                })
            })
            .catch(() => {
                toast("Error", {
                    description: "No se pudo copiar el enlace.",
                })
            })
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={event.title} />
            <div className="flex h-full flex-1 flex-col gap-2 rounded-xl p-4 overflow-x-auto">

                <Heading title={event.title} description={event.description} />
                <div className="space-y-2">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card>
                                <CardContent className="flex flex-col gap-1">
                                    <span className="font-medium">Total de invitados</span>
                                    <span className="text-neutral-500">{guestsCount}</span>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex flex-col gap-1">
                                    <span className="font-medium">Asistirán</span>
                                    <span className="text-neutral-500">{guestsAttendingCount}</span>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex flex-col gap-1">
                                    <span className="font-medium">No asistirán</span>
                                    <span className="text-neutral-500">{guestsNotAttendingCount}</span>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex flex-col gap-1">
                                    <span className="font-medium">Pendientes</span>
                                    <span className="text-neutral-500">{guestsCount - guestsAttendingCount - guestsNotAttendingCount}</span>
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Table className="rounded overflow-hidden">
                                <TableHeader className="bg-neutral-100">
                                    <TableRow>
                                        <TableHead className="w-[100px]">Name</TableHead>
                                        {/* <TableHead>Contact</TableHead> */}
                                        <TableHead>Status</TableHead>
                                        <TableHead>Link</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {guests.map((guest) => (
                                        <TableRow key={guest.id} className={guest.parent_guest_id == null ? 'bg-sky-200 hover:bg-sky-300' : ''} >
                                            <TableCell className="font-medium">{guest.first_name} {guest.last_name} {guest.phone && (<br />)} {guest?.phone}</TableCell>
                                            {/* <TableCell>
                                                {guest.phone}
                                                {guest.email && <br />}
                                                {guest.email}
                                            </TableCell> */}
                                            
                                            <TableCell>
                                                {guest.is_attending == null ? <Badge>No respondió</Badge> : guest.is_attending ? <Badge className="bg-green-500">Asistirá</Badge> : <Badge className="bg-red-500">No asistirá</Badge>}
                                            </TableCell>
                                            <TableCell>
                                                <div className="grid md:grid-cols-2  gap-3">
                                                    <Button onClick={() => handleCopy(`${window.location.origin}/invitation/guests/${guest.id}`)} variant={'outline'}>
                                                        Copy link
                                                    </Button>
                                                    {guest.phone && (
                                                        <a
                                                            href={`https://wa.me/+52${guest.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                                                                `¡Hola! ${guest.first_name}, con la alegría en el corazón, te invitamos a compartir con nosotros el día en que uniremos nuestras vidas en matrimonio. 🤍 \n\n${window.location.origin}/invitation/guests/${guest.id}\n\nPor favor confírmanos si asistirás 😊`
                                                            )}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Button variant="secondary" className="w-full">
                                                                WhatsApp <ExternalLink className="w-4 h-4 ml-1" />
                                                            </Button>
                                                        </a>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )

}