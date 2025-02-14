import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='w-full flex justify-center items-center min-h-screen'>
        <div className='w-1/3 flex justify-center items-center min-h-screen h-full p-6 bg-white rounded-lg shadow-md relative'>
            {/* Grid background */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_white_100%)]" />
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgb(0 0 0 / 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgb(0 0 0 / 0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '4rem 4rem',
                    }}
                />
            </div>
            <SignIn />
        </div>
        <div className='w-2/3 min-h-screen h-full flex justify-center items-center p-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-md'>
            <div className="flex flex-col justify-center items-center h-full text-white">
                <div className="max-w-2xl text-center space-y-6">
                    <blockquote className="text-2xl font-light italic">
                        "Latextia has revolutionized how I digitize my handwritten notes. 
                        The accuracy and speed are remarkable, saving me hours of manual typing."
                    </blockquote>
                    <div className="mt-4 flex items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-2xl font-semibold">
                            R
                        </div>
                        <div className="text-left">
                            <p className="font-semibold">Undergraduate Student</p>
                            <p className="text-sm opacity-80">Rice University</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}