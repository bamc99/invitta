import AudioPlayer from "@/components/generic/player";

export default function SingleInvite() {
    return <>
        <main className="bg-[#f7f1e1]">
            <div className="min-h-[90dvh] flex flex-col justify-between p-10 bg-[url('/cover_1.jpg')] bg-cover bg-center relative rounded-b-4xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70 z-0" />

                <div className="flex z-10 flex-col items-center text-white">
                    <h5 className="text-3xl">Wedding Day</h5>
                    <h4 className="text-3xl">13 | 09 | 25</h4>
                    <span className="my-2"></span>
                    {/* <h3 className="text-4xl font-medium">Yazmin & Bruno</h3> */}
                </div>
                {/* <div className="flex z-10 flex-col items-center text-center text-white">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus doloremque cumque repudiandae quibusdam, aspernatur nemo quis aperiam a, dolorum cum reprehenderit deleniti consequatur! Modi illum earum molestias error eos eligendi.
                </div> */}
                <div className="z-10 w-[60%] mx-auto">
                    <AudioPlayer />
                </div>
            </div>
            <div className="min-h-64">
                <div className="flex z-10 flex-col items-center text-center text-slate-700 text-2xl p-10">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus doloremque cumque repudiandae quibusdam, aspernatur nemo quis aperiam a, dolorum cum reprehenderit deleniti consequatur! Modi illum earum molestias error eos eligendi.
                </div>
            </div>
        </main>
    </>
}