import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import type { Event } from "@/types/event";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Guest } from "@/types/guest";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Event',
        href: '/event',
    },
];
export default function SingleEventPage() {

    const { event, guests } = usePage<{ event: Event; guests: Guest[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={event.title} />
            <div className="flex h-full flex-1 flex-col gap-2 rounded-xl p-4 overflow-x-auto">

                <Heading title={event.title} description={event.description} />
                <div className="space-y-2">
                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <Card>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col gap-2">
                                        <span>Status</span>
                                        <span>{event.status}</span>
                                    </div>
                                    {/* <div className="flex flex-col gap-2">
                                        <span>Start date</span>
                                        <span>{event.start_date.toDateString()}</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span>End date</span>
                                        <span>{event.end_date.toDateString()}</span>
                                    </div> */}
                                </div>
                            </Card>
                        </div>
                        <div className="col-span-3">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Name</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Link</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {guests.map((guest) => (
                                        <TableRow key={guest.id}>
                                            <TableCell className="font-medium">{guest.first_name} {guest.last_name}</TableCell>
                                            <TableCell>
                                                {guest.email}
                                                {guest.phone && <br />}
                                                {guest.phone}
                                            </TableCell>
                                            <TableCell>
                                                {guest.is_attending == null ? 'Not responded' : guest.is_attending ? 'Attending' : 'Not attending'}
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/invitation/guests/${guest.id}`}>
                                                    View invitation
                                                </Link>
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