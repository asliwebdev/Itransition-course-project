<table className="table table-pin-rows table-pin-cols">
             <thead>
               <tr>
                 <th>
                   <span className="text-2xl cursor-pointer"><FaRegMinusSquare /></span>
                 </th>
                 <th><span className="responsive-text">ID</span></th>
                 <th><span className="responsive-text">Name</span></th>
                 <th><span className="responsive-text">e-Mail</span></th>
                 <th><span className="responsive-text">Last Login</span></th>
                 <th><span className="responsive-text">Registration time</span></th>
                 <th><span className="responsive-text">Status</span></th>
                 <th><span className="responsive-text">Role</span></th>
               </tr>
             </thead>
             <tbody>
              {
                users.map((user, index) => {
                  const {name, email, lastLogin, status, registrationTime, _id, role} = user;
                return <tr key={index}>
                        <th>
                          <label>
                            <input type="checkbox" className="checkbox"/>
                          </label>
                        </th>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{formatTime(lastLogin)}</td>
                        <td>{formatTime(registrationTime)}</td>
                        <td>{status}</td>
                        <td>{role}</td>
                      </tr>
                })
              }
             </tbody>
            </table>

      const users = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      lastLogin: "2023-10-25T18:30:00Z",
      registrationTime: "2023-05-15T10:15:00Z",
      status: "active",
      role: "user",
    },
    {
      name: "Alice Smith",
      email: "alice.smith@example.com",
      lastLogin: "2023-10-24T14:45:00Z",
      registrationTime: "2023-09-05T09:20:00Z",
      status: "active",
      role: "user",
    },
    {
      name: "Admin User",
      email: "admin@example.com",
      lastLogin: "2023-10-25T10:00:00Z",
      registrationTime: "2023-03-10T15:30:00Z",
      status: "active",
      role: "admin",
    },
  ];
