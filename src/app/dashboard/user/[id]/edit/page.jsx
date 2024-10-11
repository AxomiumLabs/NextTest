
// import { CONFIG } from 'src/config-global';
// import axios from 'axios';
// import { UserEditView } from 'src/sections/user/view';

// // import React, { useState, useEffect, } from 'react';
// import { UserNewEditForm } from 'src/sections/user/user-new-edit-form';

// // ----------------------------------------------------------------------

// // export const metadata = { title: `User edit | Dashboard - ${CONFIG.appName}` };

// export default function Page({ params }) {

//   const { id } = params; 

// console.log('lnskjbv',id);

//   // const [currentUser, setCurrentUser] = useState(null);


 
//   // useEffect(() => {
//   //   const UserData = async () => {
//   //     try {
//   //       const response = await axios.get(`https://api-dev.alacater.com/customers/all-restaurants/Al%20Barsha%20First`);
//   //       setCurrentUser(response.data);
//   //     } catch (error) {
//   //       console.error('Error fetching user data:', error);
//   //     }
//   //   };

//   //   UserData();
//   // }, [id]);  
//   // console.log('s csb',currentUser);

//   // if (!currentUser) {
//   //   return <div>sncmfdsnb v</div>;  
//   // }

//   // return (<>
//   // <UserNewEditForm getuser={currentUser} />
//   // </>);
// }

// // ----------------------------------------------------------------------

// /**
//  * [1] Default
//  * Remove [1] and [2] if not using [2]
//  */
// // const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';

// // export { dynamic };

// // // /**
// // //  * [2] Static exports
// // //  * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
// // //  */
// export async function generateStaticParams() {
//   if (CONFIG.isStaticExport) {
//     return currentUser.map((user) => ({ id: user.id }));
//   }
//   return [];
// }
import { CONFIG } from 'src/config-global';
import { _userList } from 'src/_mock/_user';

import { UserEditView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata = { title: `User edit | Dashboard - ${CONFIG.appName}` };

export default function Page({ params }) {
  const { id } = params;


  const currentUser = _userList.find((user) => user.id === id);

  return <UserEditView user={id} />;
}

// ----------------------------------------------------------------------

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 */
const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';

export { dynamic };

/**
 * [2] Static exports
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
export async function generateStaticParams() {
  if (CONFIG.isStaticExport) {
    return _userList.map((user) => ({ id: user.id }));
  }
  return [];
}

