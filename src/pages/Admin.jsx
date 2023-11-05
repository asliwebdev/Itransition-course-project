import { useDispatch, useSelector } from "react-redux"
import { ActionButtonsGroup, UsersTable } from "../components"
import { handleActions } from "../features/userSlice";

const Admin = () => {
  const {isLoading} = useSelector(store => store.user);
  const dispatch = useDispatch();

  const performAction = (actionType) => {
    dispatch(handleActions(actionType));
  }

  if(isLoading) {
    return (
       <div className="w-full flex justify-center">
         <span className="loading loading-spinner text-primary w-16"></span>
       </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between px-4">
        <h1 className="font-bold text-3xl leading-[42px]">All Users</h1>
        <ActionButtonsGroup performAction={performAction}/>
      </div>
      <div className="flex items-center justify-start gap-x-6 mt-8 px-3">
        <button type="button" className="btn bg-base-300  capitalize text-[#7B8EC8]" onClick={() => performAction('addAdmin')}>
         Add Admin
        </button>
        <button type="button" className="btn bg-base-300 capitalize text-[#7B8EC8]" onClick={() => performAction('removeAdmin')}>
         Remove Admin
        </button>
      </div>
      <UsersTable />
    </>
  )
}

export default Admin