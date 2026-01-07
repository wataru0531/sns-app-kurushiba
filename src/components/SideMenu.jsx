

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
  // console.log(currentUser);
  const { email, userName } = currentUser ?? {};

  if(!currentUser) return null;

  return(
    <div className="bg-white p-4 rounded-lg shadow-md h-[200px] flex flex-col justify-center">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      <p className="break-words">
        <strong>Name: </strong>{ userName }
      </p>
      <p className="break-words">
        <strong>Email: </strong>{ email }
      </p>
    </div>
  )
}