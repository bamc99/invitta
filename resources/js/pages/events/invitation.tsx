import AudioPlayer from '@/components/generic/player';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Guest } from '@/types/guest';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Check, Mail } from 'lucide-react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

export default function SingleInvite() {
    const { guest } = usePage<{ guest: Guest }>().props;
    const { appUrl } = usePage<{ appUrl: string }>().props;
    const invitationUrl = `${appUrl}/invitation/guests/${guest.id}`;
    const image = `${appUrl}/cover_resized.jpg`;

    const { post, setData, errors } = useForm();
    const [confirmations, setConfirmations] = useState<{ id: number, is_attending: boolean }[]>([]);
    const [open, setOpen] = useState(false);

    const handleCheckboxChange = (id: number, checked: boolean) => {
        setConfirmations((prev) => {
            const updated = [...prev];
            const index = updated.findIndex((item) => item.id === id);
            if (index > -1) {
                updated[index].is_attending = checked;
            } else {
                updated.push({ id, is_attending: checked });
            }
            setData('confirmations', confirmations);
            return updated;
        });
    };
    const initialized = useRef(false);
    useEffect(() => {
        if (!initialized.current && guest) {
            const updatedConfirmations = [
                { id: guest.id, is_attending: guest?.is_attending ?? false },
                ...(guest.guests ?? []).map((g) => ({
                    id: g.id,
                    is_attending: g?.is_attending ?? false,
                })),
            ];

            setConfirmations(updatedConfirmations);
            setData('confirmations', updatedConfirmations);
            initialized.current = true;
        }
    }, [guest]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('guests.confirmations'));
    };

    if (!guest) {
        return null;
    }
    if (!guest.is_attending && guest.is_attending !== null) {
        // la invitación caducó
        return (
            <div className="flex flex-col items-center gap-4 px-5 py-10 text-black max-w-lg mx-auto">
                <div>
                    <TitleItalic>{`Hola ${guest?.first_name},`}</TitleItalic>
                    <TitleItalic>
                        lamentamos que no puedas asistir a nuestro boda.
                    </TitleItalic>
                </div>
            </div>
        )
    }

    return (
        <>
            <HeaderTags guest={guest} invitationUrl={invitationUrl} cover={image} />
            <main className="bg-[#fffefa]">
                <div className="relative flex min-h-[80dvh] flex-col justify-between overflow-hidden rounded-b-4xl bg-[url('/cover_1.jpg')] bg-cover bg-center p-10">
                    <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black opacity-70" />
                    <div className="z-10 flex flex-col items-center text-[#fff5e9] font-luxes gap-2">
                        <h5 className="text-3xl">Wedding Day</h5>
                        <h4 className="text-3xl">13/09/25</h4>
                        <h3 className="text-2xl font-medium">Yazmin & Bruno</h3>
                    </div>
                    <div className="z-10 mx-auto w-[60%]">
                        <AudioPlayer />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4 px-5 py-5 text-black max-w-lg mx-auto">
                    <div>
                        <TitleItalic>{`Hola ${guest?.first_name},`}</TitleItalic>
                        <TitleItalic>
                            queremos compartir con ustedes la alegría de unir nuestras vidas y hacerlos parte de este momento tan especial.
                        </TitleItalic>
                    </div>
                    <div>
                        <br />
                        <TitleSans>Sábado, 13 de Septiembre, 2025</TitleSans>
                        <GradientImage src="/images/anillos.jpg" />
                        <TitleSans>Ceremonia Civil: 3:30 PM</TitleSans>
                        <TitleItalic>les pedimos amablemente ser puntuales</TitleItalic>
                    </div>
                    <div>
                        <GradientImage src="/images/lugar.png" />
                        <TitleSans>Lugar: Top Salón San Jerónimo</TitleSans>
                        <TitleItalic>Plaza Oasis, Aaron Sáenz Garza 1902, Santa María, Monterrey, N.L.</TitleItalic>
                    </div>
                    <div>
                        <GradientImage src="/images/vestimenta.png" vertical />
                        <TitleSans>Código de vestimenta: Formal</TitleSans>
                    </div>
                    <div>
                        <GradientImage src="/images/after.png" vertical/>
                        <div className='my-2'></div>
                        <TitleSans>After Party</TitleSans> 
                        <TitleItalic>La ubicación será compartida próximamente.</TitleItalic>
                    </div>
                    <div className='mt-5'>
                        <div className="text-center">
                            <TitleItalic>
                                Tu compañía lo es todo para nosotros, pero si gustas obsequiarnos algo, un sobre será bien recibido
                            </TitleItalic>
                            <Mail className="mx-auto my-2" />
                        </div>
                    </div>
                    <div>
                        <TitleSans>EVENTO EXCLUSIVO PARA ADULTOS</TitleSans>
                    </div>
                    <div>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button variant={'outline'} className='border border-black' onClick={() => setOpen(true)}>
                                    <TitleItalic>
                                        Confirmar asistencia
                                    </TitleItalic>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Confirmar asistencia
                                    </DialogTitle>
                                    <DialogDescription>
                                        Por favor, confirma tu asistencia antes del 27 de Julio. Si tienes alguna pregunta, no dudes en contactarnos.
                                    </DialogDescription>
                                </DialogHeader>
                                {
                                    guest.is_attending ? (
                                        <div className='text-center py-2'>
                                            <Check className='text-green-600 mx-auto' size={48} />
                                            <TitleItalic className='text-xl'>
                                                Ya confirmaste tu asistencia
                                            </TitleItalic>
                                        </div>
                                    ) : (
                                        <>
                                            <p>Selecciona las personas que podrán asistir</p>
                                            <form onSubmit={submit}>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Nombre</TableHead>
                                                            <TableHead className='text-center'>Asistirá</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className='text-start'>
                                                                <Label htmlFor={`confirm-${guest.id}`}>
                                                                    {guest.first_name} {guest.last_name}
                                                                </Label>
                                                            </TableCell>
                                                            <TableCell className='text-center'>
                                                                <Switch
                                                                    checked={
                                                                        confirmations.find((c) => c.id === guest.id)?.is_attending ?? false
                                                                    }
                                                                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                                                                    id={`confirm-${guest.id}`}
                                                                    onCheckedChange={(checked) =>
                                                                        handleCheckboxChange(guest.id, !!checked)
                                                                    }
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                        {(guest?.guests ?? []).map((guest) => (
                                                            <TableRow key={guest.id}>
                                                                <TableCell className='text-start'>
                                                                    <Label htmlFor={`confirm-${guest.id}`}>
                                                                        {guest.first_name} {guest.last_name}
                                                                    </Label>
                                                                </TableCell>
                                                                <TableCell className='text-center'>
                                                                    {/* <Checkbox id={`confirm-${guest.id}`} onCheckedChange={(checked) => handleCheckboxChange(guest.id, !!checked)} /> */}
                                                                    <Switch
                                                                        checked={
                                                                            confirmations.find((c) => c.id === guest.id)?.is_attending ?? false
                                                                        }
                                                                        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                                                                        id={`confirm-${guest.id}`}
                                                                        onCheckedChange={(checked) =>
                                                                            handleCheckboxChange(guest.id, !!checked)
                                                                        }
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Cancelar</Button>
                                                    </DialogClose>
                                                    {Object.values(errors).map((message, i) => (
                                                        <InputError key={i} message={message} className="mt-2" />
                                                    ))}
                                                    <Button type='submit'>Enviar confirmaciones</Button>
                                                </DialogFooter>
                                            </form>
                                        </>
                                    )
                                }
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div>
                        <GradientImage src="/images/nosotros.png" vertical />
                    </div>
                    <div>
                        <TitleItalic>Con especial gratitud a Leslie y Cecilia Gómez por su apoyo en hacer este día posible.</TitleItalic>
                    </div>
                </div>
            </main>
        </>
    );
}

const TitleSans = ({ children, className }: { children: string; className?: string }) => {
    return <h5 className={`text-center font-luna ${className}`}>{children}</h5>;
};

const TitleItalic = ({ children, className }: { children: string; className?: string }) => {
    return <p className={`text-center font-italic ${className}`}>{children}</p>;
};

const GradientImage = ({ src, vertical }: { src: string; vertical?: boolean }) => {
    return (
        <div className={`relative mx-auto overflow-hidden rounded-xl ${vertical ? 'w-[60%]' : 'w-[80%]'}`}>
            <img src={src} className="h-full w-full object-cover" alt="" />
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `linear-gradient(to right, #fffefa, transparent 20%, transparent 80%, #fffefa),
         linear-gradient(to bottom, #fffefa, transparent 20%, transparent 80%, #fffefa)`,
                }}
            />
        </div>
    );
};

const HeaderTags = ({ guest, invitationUrl, cover }: { guest: Guest; invitationUrl: string; cover: string; }) => {

    return (
        <Head title={`Invitación para ${guest.first_name}`}>
            <meta name="description" content="Acompáñanos en un día muy especial: nuestra boda el 13 de Septiembre de 2025." />

            {/* Open Graph para WhatsApp / Facebook */}
            <meta property="og:title" content="Yazmin & Bruno - Invitación de boda" />
            <meta property="og:description" content="Estás cordialmente invitado a nuestra boda. ¡Confirma tu asistencia!" />
            <meta property="og:image" content={cover} />
            <meta property="og:url" content={invitationUrl} />
            <meta property="og:type" content="website" />

            {/* Para Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Yazmin & Bruno - Invitación de boda" />
            <meta name="twitter:description" content="Estás cordialmente invitado a nuestra boda. ¡Confirma tu asistencia!" />
            <meta name="twitter:image" content={cover} />
        </Head>
    )
}