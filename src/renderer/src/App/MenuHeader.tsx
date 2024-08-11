import { GreedIcon } from "@renderer/assets/icons";

export function MenuHeader() {
    return (
        <div className="mt-5 flex w-full max-h-[50px] max-w-full items-center ps-6">
            <img src={GreedIcon} className="size-12 max-xl:size-10" alt="greed-icon" />
            <div className="font-extrabold text-sm">
            Greed Client
            </div>
        </div>
    )
}