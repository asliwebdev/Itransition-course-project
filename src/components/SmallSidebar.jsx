import { useDispatch, useSelector } from "react-redux"
import { toggleSidebar } from "../features/userSlice";
import { Link, NavLink } from "react-router-dom";
import {LiaTimesSolid} from 'react-icons/lia'
import { links } from "../utils/constants";

const SmallSidebar = () => {
    const {isSidebarOpen} = useSelector(store => store.user);
    const dispatch = useDispatch();
    
  return (
    <div className={`fixed inset-0 z-50 min-h-screen min-w-full ${isSidebarOpen ? 'visible' : 'invisible'} backdrop-blur-sm transition-all duration-300`}>
      <div className={`fixed z-50 top-0 left-0 h-full p-6 w-3/4 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
       bg-secondary transition-all duration-300`}>
        <Link to='/' className="text-[24.85px]">Coll<span className="text-primary">App</span></Link>
        <div className="flex flex-col justify-between h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-1 flex-col gap-6 pt-16 h-full">
           {
             links.map(link => {
              let {id, url, text, icon} = link;
              return <NavLink key={id} to={url} className={({isActive}) => isActive ? 'small-nav-link bg-primary text-white font-bold' 
              : 'small-nav-link'} onClick={() => dispatch(toggleSidebar())}>
                 {icon}
                 <p className="capitalize text-white">{text}</p>
              </NavLink>
            })
           }
          </div>
          <div className="flex flex-col gap-3">
           <Link to='/login' className="btn bg-base-300">
             <span className="text-primary">Log in</span>
           </Link>
           <Link to='/register' className="btn btn-neutral text-base-content border-transparent">
             <span>Sign up</span>
           </Link>
          </div>
        </div>
          <button type="button" className="absolute right-4 top-4" onClick={() => dispatch(toggleSidebar())}>
             <LiaTimesSolid />
          </button>
        </div>
    </div>
  )
}

export default SmallSidebar