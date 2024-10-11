'use client';

import { paths } from 'src/routes/paths';
import axios from'axios'
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { UserNewEditForm } from '../user-new-edit-form';
import { useEffect,useState } from 'react';
// ----------------------------------------------------------------------

export function UserEditView({ user: currentUser }) {
  const [loading,setloading]= useState(false)
  const[itemsget,setitemsget]= useState([])
 
  
   useEffect(() => {
     const UserData = async () => {
      const token = localStorage.getItem('token')
       try {
         const response = await axios.get(`https://api-dev.alacater.com/caters/restaurants/67010c80c14896f009d95801`,{headers:{
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
  
        }});
        
       const items = response.data.find(item=>item._id===currentUser)
       setitemsget(items)
       setloading(true)
    
       
       } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    UserData();
  }, []);  

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.root },
          { name: currentUser?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
{loading&&(<UserNewEditForm currentUser={itemsget} />)}
      
    </DashboardContent>
  );
}
