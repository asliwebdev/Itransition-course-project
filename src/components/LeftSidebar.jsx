import { Link, NavLink, redirect } from "react-router-dom"
import { links } from "../utils/constants"
import {BsPersonAdd, BsPersonCircle} from 'react-icons/bs'
import {RiAdminLine} from 'react-icons/ri'
import {BiLogOut} from 'react-icons/bi'
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify'
import { logoutUser } from "../features/userSlice"

const LeftSidebar = () => {
  const {user} = useSelector(store => store.user);
  const dispatch = useDispatch();

  const logout = () => {
    toast.success('Logging out...');
    dispatch(logoutUser());
    redirect('/');
  }

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
         {  user?.role === 'admin' && <NavLink to='/admin' 
             className={({isActive}) => isActive ? 'nav-link bg-primary text-white rounded-lg' : 'nav-link'}>
              <RiAdminLine />
              <p className="capitalize max-lg:hidden">Admin</p>
            </NavLink>
          }
       </div>
       {
        user ? ( <button type="button" className="nav-link" onClick={logout}>
           <BiLogOut /><span className="capitalize max-lg:hidden">Logout</span></button> ) : (
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
        )
       }
    </aside>
  )
}

export default LeftSidebar