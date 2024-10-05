'use client';
import { CONFIG } from 'src/config-global';
import axios from 'axios';
import { UserEditView } from 'src/sections/user/view';
import { UploadAvatar } from 'src/components/upload';
import React, { useState, useEffect, useCallback } from 'react';
// ----------------------------------------------------------------------

// export const metadata = { title: `User edit | Dashboard - ${CONFIG.appName}` };

export default function Page({ params }) {
  
  const { id } = params; 


  const [currentUser, setCurrentUser] = useState(null);


 
  useEffect(() => {
    const UserData = async () => {
      try {
        const response = await axios.get(`https://api-dev.alacater.com/customers/all-restaurants/Al%20Barsha%20First`);
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    UserData();
  }, [id]);  
  console.log('s csb',currentUser);

  if (!currentUser) {
    return <div>sncmfdsnb v</div>;  
  }

  return (<>
  <UserEditView user={currentUser} />
  </>);
}

// ----------------------------------------------------------------------

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 */
// const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';

// export { dynamic };

// /**
//  * [2] Static exports
//  * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
//  */
// export async function generateStaticParams() {
//   if (CONFIG.isStaticExport) {
//     return _userList.map((user) => ({ id: user.id }));
//   }
//   return [];
// }
