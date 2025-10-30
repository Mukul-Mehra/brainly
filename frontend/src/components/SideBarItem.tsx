import type { ReactElement } from "react"

export function SideBaItem({ icon, text }: {
    icon: ReactElement,
    text: string
}) {
    return <>
    <div className="flex items-center gap-2 text-xl cursor-pointer hover:bg-gray-400 hover:text-white transition-all duration-100">
        <div className="p-2 cursor-pointer">
            {icon}

        </div> 
        <div className="p-2">
            {text}
        </div>

    </div>
    </>
}