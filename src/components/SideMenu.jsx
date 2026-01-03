

// import { useContext } from 'react';
// import { SessionContext } from '../SessionProvider';

// export function SideMenu() {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md h-[200px] flex flex-col justify-center">
//       <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
//       <p>
//         <strong>Name:</strong> くるしば
//       </p>
//       <p>
//         <strong>Email:</strong> kuru-shiba@gmail.com
//       </p>
//     </div>
//   );
// }


import { useContext } from 'react';
import { SessionContext } from "../sessionProvider";


export const SideMenu = () => {
  const { currentUser } = useContext(SessionContext);
  const { email, _name: name } = currentUser?.user_metadata ?? {};
  // console.log(email, _name);

  if(!currentUser) return null;

  return(
    <div className="bg-white p-4 rounded-lg shadow-md h-[200px] flex flex-col justify-center">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      <p className="break-words">
        <strong>Name: </strong>{ name }
      </p>
      <p className="break-words">
        <strong>Email: </strong>{ email }
      </p>
    </div>
  )
}