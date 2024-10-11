'use client';

import axios, { endpoints } from 'src/utils/axios';
import { paths } from 'src/routes/paths';

import { STORAGE_KEY } from './constant';
import { status } from 'nprogress';
import { setSession } from './utils';

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password,role }) => {
  try {
    const params = { email, password,role:"admin" };

    const res = await axios.post('https://api-dev.alacater.com/caters/login', params);

localStorage.setItem('token',res.data.token)
   const accessToken=localStorage.getItem('token')

   
alert('login succsessfull')
window.location.href = paths.dashboard.root
  setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({ email, password, firstName, lastName,phoneNumber,role,
  status }) => {
  const params = {
    email,
    password,
    firstName,
    lastName,
    role:'admin',
    status:true,
    phoneNumber:'7890897867'
  };

  try {
    const res = await axios.post('https://api-dev.alacater.com/caters', params);

    // const { accessToken } = res.data;
        alert('registrationsuccsussful')
     
        window.location.href = paths.auth.jwt.signIn;
    // if (!accessToken) {
    //   throw new Error('Access token not found in response');
    // }

    // localStorage.setItem(STORAGE_KEY, accessToken);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
