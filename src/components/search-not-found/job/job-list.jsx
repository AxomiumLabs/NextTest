import { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';

import { JobItem } from './job-item';
import { fetcher } from 'src/utils/axios';
// ----------------------------------------------------------------------

export function JobList({ jobs}) {

 


  const router = useRouter();


  const handleView = useCallback(
    (id) => {
      router.push(paths.dashboard.job.details(id));
    },
    [router]
  );

  const handleEdit = useCallback(
    (id) => {
      router.push(paths.dashboard.job.edit(id));
    },
    [router]
  );
  const handleClick = () => {

  }
  
  const handleDelete = useCallback((id) => {
    console.info('DELETE', id);
  }, []);

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        {jobs.map((job) => (
          <JobItem
            key={job.id}
            job={job}
            onView={() => handleView(job.id)}
            onEdit={() => handleEdit(job.id)}
            onDelete={() => handleDelete(job.id)}
          />
        ))}
      </Box>
  
    
      {/* {jobs.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: { xs: 8, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )} */}
    </>
  );
}
