import { ReactNode } from "react"
import SideNavigation from "../components/SideNavigation"

function layout({children}:{children:ReactNode}) {
  return (
    <div className=" grid grid-cols-[16rem_1fr] h-full min-h-[75vh] gap-12">
        <SideNavigation/>
        <div className=" py-1">{children}</div>
    </div>
  )
}

export default layout