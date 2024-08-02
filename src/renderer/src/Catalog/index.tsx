import { Input } from "@renderer/components/ui/input";
import SearchIcon from "@renderer/assets/icon-search.svg"

export function Catalog() {
    return (
        <>
            <div className="flex gap-2 max-h-[10vh] justify-end mt-10 me-10">
                <div className="rounded-md bg-zinc-800 flex p-2 ps-4 items-center 
                hover:shadow-xl">
                    <img src={SearchIcon} alt="search-icon" className="size-4" />
                    <Input 
                        className="max-w-[14vw] max-h-8 border-none focus-visible:ring-0
                            focus-visible:ring-offset-0" 
                        type="text" placeholder="Search"/>
                </div>
            </div>

            <div className="mt-[10vh] ps-10">
                <h1 className="text-2xl">
                    Catalog 
                </h1>
            </div>
        </>
    )
}