import { Link, NavLink } from "react-router-dom"
import { links } from "../utils/constants"
import {BsPersonAdd, BsPersonCircle} from 'react-icons/bs'


const LeftSidebar = () => {
  return (
    <aside className='bg-secondary p-6 pt-36 sticky top-0 left-0 min-h-screen w-fit max-sm:hidden 
    lg:w-[266px] overflow-y-auto flex flex-col justify-between light-shadow border-r border-base-300'>
       <div className="flex flex-1 flex-col gap-6">
         {
          links.map(link => {
            let {id, url, text, icon} = link;
            return <NavLink key={id} to={url} className={({isActive}) => isActive ? 'nav-link bg-primary text-white rounded-lg' : 'nav-link'}>
                 {icon}
                 <p className="capitalize max-lg:hidden">{text}</p>
            </NavLink>
          })
         }
       </div>
       <div className="flex flex-col gap-3">
         <Link to='/login' className="btn bg-base-300">
          <BsPersonCircle className="lg:hidden text-lg"/>
          <span className="max-lg:hidden text-primary">Log in</span>
         </Link>
         <Link to='/register' className="btn btn-neutral text-base-content border-transparent">
          <BsPersonAdd className="lg:hidden text-lg" />
          <span className="max-lg:hidden">Sign up</span>
         </Link>
       </div>
    </aside>
  )
}

export default LeftSidebar