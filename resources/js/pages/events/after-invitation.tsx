import AudioPlayer from '@/components/generic/player';
import { Button } from '@/components/ui/button';
import { Head, usePage } from '@inertiajs/react';
import { Mail } from 'lucide-react';

export default function SingleInvite() {
    const { appUrl } = usePage<{ appUrl: string }>().props;
    const invitationUrl = `${appUrl}/after-invitation`;
    const image = `${appUrl}/meta_after_cover.webp`;

    return (
        <>
            <HeaderTags invitationUrl={invitationUrl} cover={image} />
            <main className="bg-[#fffefa]">
                <div className="relative flex min-h-[80dvh] flex-col justify-between overflow-hidden rounded-b-4xl bg-[url('/images/after/after-cover.jpeg')] bg-cover bg-center p-10">
                    <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black opacity-70" />
                    <div className="z-10 flex flex-col items-center gap-2 font-luxes text-[#fff5e9]">
                        <h5 className="text-3xl">After Party</h5>
                        <h4 className="text-3xl">13/09/25</h4>
                        <h3 className="text-2xl font-medium">Yazmin & Bruno</h3>
                    </div>
                    <div className="z-10 mx-auto w-[60%]">
                        <AudioPlayer customSong='/song_after.mp3'/>
                    </div>
                </div>
                <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-5 py-5 text-black">
                    <div>
                        <TitleItalic nobr>¡Hola!, </TitleItalic>
                        <TitleItalic>queremos seguir celebrando con ustedes este día tan especial. ¡after obligatorio!</TitleItalic>
                    </div>
                    <div>
                        <br />
                        <TitleSans>Sábado, 13 de Septiembre, 2025</TitleSans>
                        <GradientImage src="/images/after/after-clock.png" />
                        <TitleSans>Hora: 7:00 PM</TitleSans>
                        <TitleItalic>los esperamos con gusto</TitleItalic>
                    </div>
                    <div className='text-center'>
                        <GradientImage src="/images/after/after-place.jpeg" />
                        <TitleSans>LUGAR: QUINTA NOGALITO</TitleSans>
                        <TitleItalic>Portal del Norte, Chabacano #1804</TitleItalic>
                        <Button className="border border-black my-4" asChild>
                            <a rel="stylesheet" href="https://maps.app.goo.gl/scMifmHvu5Ur4swz9?g_st=iw" target="_blank">
                                <TitleSans>Ver en Google Maps</TitleSans>
                            </a>
                        </Button>
                    </div>
                    <div>
                        <GradientImage src="/images/after/after-dress.png" vertical />
                        <TitleSans>Dress code: Formal casual</TitleSans>
                        <TitleItalic>¡Recuerda llevar zapatos cómodos!</TitleItalic>
                    </div>
                    <div>
                        <GradientImage src="/images/after/after-drinks.png" vertical />
                        <div className="my-2"></div>
                        <TitleSans>BARRA LIBRE desde las 9:30 pm</TitleSans>
                        <TitleItalic>¡NO incluye cerveza! Si gustas, lleva la tuya en lata.</TitleItalic>
                    </div>
                    <div className="mt-5">
                        <div className="text-center">
                            <TitleItalic>
                                Tu compañía lo es todo para nosotros, pero si gustas obsequiarnos algo, un sobre será bien recibido
                            </TitleItalic>
                            <Mail className="mx-auto my-2" />
                        </div>
                    </div>
                    <div>
                        <TitleSans>EVENTO EXCLUSIVO PARA ADULTOS</TitleSans>
                        <TitleSans>INVITACIÓN PERSONAL</TitleSans>
                        <TitleItalic>Confirma tu asistencia mediante Whatsapp, por favor</TitleItalic>
                    </div>
                </div>
            </main>
        </>
    );
}

const TitleSans = ({ children, className }: { children: string; className?: string }) => {
    return <><h5 className={`text-center font-luna ${className}`}>{children}</h5></>;
};

const TitleItalic = ({ children, className, nobr }: { children: string; className?: string; nobr?: boolean; }) => {
    return <>
        <p className={`text-center font-italic ${className}`}>{children}</p>
        {!nobr && <br />}
    </>;
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

const HeaderTags = ({ invitationUrl, cover }: { invitationUrl: string; cover: string }) => {
    return (
        <Head title={`Invitación al after`}>
            <meta name="description" content="Acompáñanos en un día muy especial: nuestro after el 13 de Septiembre de 2025." />

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
    );
};
