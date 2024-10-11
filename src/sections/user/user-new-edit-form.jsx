import { z as zod } from 'zod';
import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'
// import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// import { fData } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';

import { schemaHelper } from 'src/components/hook-form/schema-helper';
import { Field, Form, } from 'src/components/hook-form';
import { _phoneNumbers } from 'src/_mock';
import axiosInstance, { createData } from 'src/utils/axios';




// ----------------------------------------------------------------------

export const NewUserSchema = zod.object({
  avatarUrl: schemaHelper.file({
    message: { required_error: 'Avatar is required!' },
  }),
  //  image: schemaHelper.file({
  //     message: { required_error: 'Avatar is required!' },
  //   }),
  //  bannerImage: schemaHelper.file({
  //     message: { required_error: 'Avatar is required!' },
  //   }),
  name: zod.string().min(1, { message: 'Name is required!' }),
  // email: zod
  //   .string()
  //   .min(1, { message: 'Email is required!' })
  //   .email({ message: 'Email must be a valid email address!' }),
  // phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  // country: schemaHelper.objectOrNull({
  //   message: { required_error: 'Country is required!' },
  // }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  // state: zod.string().min(1, { message: 'Company is required!' }),
  location: zod.string().min(1, { message: 'State is required!' }),
  minimum_price: zod.string().min(1, { message: 'City is required!' }),
  // low_price: zod.string().min(1, { message: 'Role is required!' }),
  website: zod.string().min(1, { message: 'Zip code is required!' }),
  description: zod.string().min(1, { message: 'description is required!' }),
  contactNumber: zod.string().min(1, { message: 'contactnumber is required!' }),
  // // Not required
  // status: zod.string(),
  // isVerified: zod.boolean(),
});

// ----------------------------------------------------------------------

export function UserNewEditForm({ currentUser }) {

  const router = useRouter();
  const defaultValues = useMemo(
    () => ({
      status: currentUser?.status || '',
      avatarUrl: currentUser?.bannerImage
        || null,
      isVerified: currentUser?.isVerified || true,
      country: currentUser?.country || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      address: currentUser?.address || '',
      name: currentUser?.name || '',
      role: currentUser?.role || '',
      website: currentUser?.website || '',
      minimum_price: currentUser?.minimum_price || 0,
      location: currentUser?.location || '',
      low_price: currentUser?.low_price || '',

      description: currentUser?.description || '',
      contactNumber: currentUser?.contactNumber || '',
    }),
    [currentUser]
  );
 
const addresURL = process.env.NEXT_PUBLIC_ADDRES_URL
const updateresURL = process.env.NEXT_PUBLIC_UPDATERES_URL
const deleteresURL = process.env.NEXT_PUBLIC_DELETERES_URL
  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });
  const {
    reset,
    watch,
    control,
    handleSubmit,

    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    const token = localStorage.getItem('token')

    try {
      if (currentUser) {

        const datas = {
          restaurant_id: currentUser._id,
          name: data.name,
          minimum_price: currentUser.minimum_price,
          address: data.address,
          description: data.description,
          website: data.website,
          banner_image: data.avatarUrl,
          contactNumber: data.contactNumber

        }
        

        const response = await axiosInstance.put(updateresURL, datas, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          }
        })
      
        console.info('DATAs', response)
        alert('updated successfully')
        router.push(paths.dashboard.three);
      } else {
        const body = {
          name: data.name,
          location: data.location,
          address: data.address,
          description: data.description,
          latitude: "32",
          longitude: "1",
          banner_image: data.avatarUrl,
          website:data.website,
          // bannerImage: null,
          contactNumber: data.contactNumber,
          cuisine_types:
            "string"
          ,
          minimum_price: data.minimum_price,


        }
      
        
        const res = await axiosInstance.post(addresURL,body,  {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,

          }
        })
        
        alert(currentUser ? 'Update success!' : 'Create success!');
         router.push(paths.dashboard.three)
      }
    } catch (error) {
      console.error(error);
    }
  });
  const handleDelete = async () => {

    const id = {
      id: [currentUser._id]
    }
   

    try {
      const token = localStorage.getItem('token')
      const response = await axiosInstance.delete(deleteresURL, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        data: id
      })
      

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={
                  (values.status === 'active' && 'success') ||
                  (values.status === 'banned' && 'error') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif

                  </Typography>
                }
              />
            </Box>

            {currentUser && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{
                  mx: 0,
                  mb: 3,
                  width: 1,
                  justifyContent: 'space-between',
                }}
              />
            )}

            <Field.Switch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />

            {currentUser && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button onClick={handleDelete} variant="soft" color="error">
                  Delete user
                </Button>
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              {/* 
              <Field.CountrySelect
                fullWidth
                name="country"
                label="Country"
                placeholder="Choose a country"
              /> */}

              <Field.Text name='name' label="Your name" />
              <Field.Text name="minimum_price" label="Minimum Price" />
              {/* <Field.Phone name="phoneNumber" label="Phone number" />  */}
               {/* <Field.Text name="state" label="State/region" />  */}
              <Field.Text name="location" label="Location" />  
              <Field.Text name="address" label="Address" />
              <Field.Text name="website" label="website" />
              <Field.Text name="description" label="description" />
              <Field.Text name="contactNumber" label="ContactNumber" />
              {/* <Field.Text name="latitude" label='Low Price' />  */}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              {/* {!currentUser?(   <LoadingButton type="submit" variant="contained"  loading={isSubmitting} >
              CreateUser
              </LoadingButton>):   (<LoadingButton type="submit" variant="contained"  onClick={handleUpdate} >
               Save Changes
              </LoadingButton>)} */}
              <LoadingButton type="submit" variant="contained" loading={isSubmitting} >
                {!currentUser ? 'Create user' : 'Save changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>


    </Form>

  );

}
