import { useEffect, useState } from 'react'
import {BsMoonFill, BsSunFill} from 'react-icons/bs'
import {RxHamburgerMenu} from 'react-icons/rx'
import { handleTheme, toggleSidebar } from '../features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// const themes = {
//   myLight: 'myLight',
//   myDark: 'myDark',
// }

// const getThemeFromLocalStorage = () => {
//   return localStorage.getItem('CourseTheme') || 'myDark'
// }

const Navbar = () => {
  //const [theme, setTheme] = useState(getThemeFromLocalStorage());
  const {theme} = useSelector(store => store.user);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  }

    // const handleTheme = () => {
    //    const {myLight, myDark} = themes;
    //    const newTheme = theme === myLight ? myDark : myLight;
    //    setTheme(newTheme);
    // }

    useEffect(() => {
       document.documentElement.setAttribute('data-theme', theme);
       localStorage.setItem('CourseTheme', theme);
    }, [theme])

  return (
    <nav className={`bg-secondary w-full flex justify-between items-center fixed z-50 gap-5 p-6 sm:px-12 ${theme === 'myLight' ? 'light-shadow' : ''}`}>
        <Link to="/" className='text-[24.85px]'>
          Coll<span className="text-primary ">App</span>
        </Link>
        <input type="search" placeholder="Search anything globally..." className={`input input-bordered w-full max-w-[600px] max-lg:hidden ${theme === 'myLight' ? 'bg-base-300' : 'bg-neutral'} placeholder:text-neutral-content`} />
        <div className="flex gap-x-6 justify-center items-center">
            <label className='swap swap-rotate text-primary'>
                <input type="checkbox" onChange={() => dispatch(handleTheme())}/>
                <BsSunFill className='swap-on h-4 w-4 ' />
                <BsMoonFill className='swap-off h-4 w-4' />
            </label>
             <RxHamburgerMenu className='sm:hidden text-[30px] cursor-pointer' onClick={toggle}/>
          </div>
    </nav>
  )
}

export default Navbar