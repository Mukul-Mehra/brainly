import { ShareIcon } from "../icons/ShareIcon";


interface CardProps {
    title: string;
    link : string;
    type : "twitter" | "youtube";
}
export function Card({ title, link, type }: CardProps) {

    return <div className="py-6 px-3 border rounded-md max-w-72 border-gray-200 bg-white h-fit">
        <div className=' justify-around items-center'>
            <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2 text-md">
                    <div className="text-gray-500 cursor-pointer">
                        <ShareIcon />
                    </div>
                    <div className="cursor-pointer text-lg font-medium">
                        <h2>{title}</h2>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-gray-500 cursor-pointer">
                        <ShareIcon />
                    </div>
                    <div className="text-gray-500 cursor-pointer">
                        <ShareIcon />
                    </div>
                </div>

            </div>
            <div>
                {type === "youtube" && <iframe className="w-full" src={link.replace( "watch", "embed").replace("?v=", "/")} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe>}

                {type === "twitter" &&
                <blockquote className="twitter-tweet">
                  <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>
}
            </div>

        </div>
    </div>
}