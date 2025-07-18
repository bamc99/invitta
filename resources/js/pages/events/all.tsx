import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import type { Event } from "@/types/event";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All events',
        href: '/events',
    },
];
export default function AllEventsPage() {

    const { events } = usePage<{ events: Event[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All events" />
            <div className="flex h-full flex-1 flex-col gap-2 rounded-xl p-4 overflow-x-auto">
                <div className="grid grid-cols-2">
                    <Heading title="Events" description="Manage all your events" />
                    <div className="flex justify-end items-center">
                        <Button>
                            Create event
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell className="font-medium">{event.title}</TableCell>
                                    <TableCell className="max-w-[200px] truncate whitespace-nowrap overflow-hidden text-ellipsis" title={event.description}>
                                        {event.description}
                                    </TableCell>
                                    <TableCell>{event.status}</TableCell>
                                    <TableCell>
                                        <Link href={`/events/${event.id}`}>
                                            <Button size={'sm'}>
                                                View event
                                            </Button>
                                        </Link>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    )

}