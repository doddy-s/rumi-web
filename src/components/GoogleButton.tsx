import googleLogo from '@assets/google.svg'

type GoogleButtonProps = {
    text: string
}

export function GoogleButton({ text }: GoogleButtonProps) {
    return (
        <>
            <div className="h-10 w-full bg-[#1271C4] rounded-md flex items-center justify-between">
                <div className="h-[2.4rem] m-[0.1rem] aspect-square bg-white rounded-l-md flex items-center justify-center">
                    <img src={googleLogo} alt="google" className="aspect-square"/>
                </div>
                <p className="text-white">{text}</p>
                <div></div>
            </div>
        </>
    )
}