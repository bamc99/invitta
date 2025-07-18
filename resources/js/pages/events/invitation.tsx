import AudioPlayer from '@/components/generic/player';
import { Guest } from '@/types/guest';
import { usePage } from '@inertiajs/react';
import { Mail } from 'lucide-react';

export default function SingleInvite() {
    const { guest } = usePage<{ guest: Guest }>().props;

    return (
        <>
            <main className="bg-[#fffefa]">
                <div className="relative flex min-h-[80dvh] flex-col justify-between overflow-hidden rounded-b-4xl bg-[url('/cover_1.jpg')] bg-cover bg-center p-10">
                    <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black opacity-70" />
                    <div className="z-10 flex flex-col items-center text-[#fff5e9] font-luxes">
                        <h5 className="text-3xl">Wedding Day</h5>
                        <h4 className="text-3xl">13/09/25</h4>
                        <span className="my-2"></span>
                        <h3 className="text-2xl font-medium">Yazmin & Bruno</h3>
                    </div>
                    <div className="z-10 mx-auto w-[60%]">
                        <AudioPlayer />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4 px-5 py-10 text-black">
                    <div>
                        <TitleItalic>{`Hola ${guest?.first_name},`}</TitleItalic>
                        <TitleItalic>
                            queremos compartir con ustedes la alegría de unir nuestras vidas y hacerlos parte de este momento tan especial.
                        </TitleItalic>
                    </div>
                    <div>
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
                        <div className="text-center">
                            <TitleItalic>
                                Tu compañía lo es todo para nosotros, pero si gustas obsequiarnos algo, un sobre será bien recibido
                            </TitleItalic>
                            <Mail className="mx-auto my-2" />
                        </div>
                    </div>
                    <div>
                        <TitleSans>EVENTO EXCLUSIVO PARA ADULTOS</TitleSans>
                        <p className="text-center text-sm">por favor confirma tu asistencia antes del 23 de Julio</p>
                    </div>
                    <div>
                        <GradientImage src="/images/nosotros.png" vertical />
                        <TitleItalic>Con especial gratitud a Leslie y Cecilia Gómez por su apoyo en hacer este día posible.</TitleItalic>
                    </div>
                </div>
            </main>
        </>
    );
}

const TitleSans = ({ children }: { children: string }) => {
    return <h5 className="text-center font-luna">{children}</h5>;
};

const TitleItalic = ({ children }: { children: string }) => {
    return <p className="text-center font-italic">{children}</p>;
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
