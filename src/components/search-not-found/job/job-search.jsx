// import parse from 'autosuggest-highlight/parse';
// import match from 'autosuggest-highlight/match';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
// import Divider from '@mui/material/Divider';
// import MenuList from '@mui/material/MenuList';
// import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import ListItemText from '@mui/material/ListItemText';

// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Autocomplete from '@mui/material/Autocomplete';
// import InputAdornment from '@mui/material/InputAdornment';
// import { paths } from 'src/routes/paths';
// import { RouterLink } from 'src/routes/components';

// import { fDate } from 'src/utils/format-time';
// import { fCurrency } from 'src/utils/format-number';

// import { Iconify } from 'src/components/iconify';
// import { usePopover, CustomPopover } from 'src/components/custom-popover';
// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';

// import { Iconify } from 'src/components/iconify';
// import { SearchNotFound } from 'src/components/search-not-found';
// import { useState } from 'react';

// // ----------------------------------------------------------------------

// export function JobSearch({ search, onSearch, filterjob }) {
//   const router = useRouter();
//   const [show, setShow] = useState(false)
//   const [options, setOptions] = useState('')
//   console.log('job', filterjob);

//   const handleClick = (id) => {
//     router.push(paths.dashboard.job.details(id));
//   };

//   const handleKeyUp = (event) => {
//     if (filterjob) {
//       if (event.key === 'Enter') {
//         const selectProduct = filterjob.filter(
//           (job) => job.name === filterjob
//         )[0];

//         handleClick(selectProduct._id);
//       }
//     }
//   };
// const onChange=(e)=>{
//   setShow(e.target.value)
// }
//  const onSelect=(option)=>{
// setOptions(option)
//  }
//   return (
//     <Autocomplete
//       sx={{ width: { xs: 1, sm: 260 } }}
//       autoHighlight
//       popupIcon={null}
//       onChange={onChange}
//       onSelect={onSelect}
//       options={filterjob}
//       onInputChange={(event, newValue) => onSearch(newValue)}
//       shouldItemRender={(option,value)=>option.name.includes(value)}
//       getOptionLabel={(option) => option.name}
//       noOptionsText={<SearchNotFound query={search.state.query} />}
//       isOptionEqualToValue={(option, value) => option.id === value.id}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           placeholder="Search..."
//           value={options}
//           onKeyUp={handleKeyUp}
//           InputProps={{
//             ...params.InputProps,
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
//               </InputAdornment>
//             ),
//           }}
//         />
//       )}
//       renderOption={(props, job, { inputValue }) => {
//         const matches = match(job.name, inputValue);
//         const parts = parse(job.name, matches);

//         return (
//           <Box component="li" {...props} onClick={() => handleClick(job.id)} key={job.id}>
//             <div>
//               {parts.map((part, index) => (
//                 <Typography
//                   key={index}
//                   component="span"
//                   color={part.highlight ? 'primary' : 'textPrimary'}
//                   sx={{
//                     typography: 'body2',
//                     fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
//                   }}
//                 >
//                   {part.text}
//                 </Typography>
//               ))}
//             </div>
//             {options && (<Card>
//               <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
//                 <Iconify icon="eva:more-vertical-fill" />
//               </IconButton>

//               <Stack sx={{ p: 3, pb: 2 }}>
//                 <Avatar
//                   alt={job.name}
//                   src={job.bannerImage}
//                   variant="rounded"
//                   sx={{ width: 48, height: 48, mb: 2 }}
//                 />

//                 <ListItemText
//                   sx={{ mb: 1 }}
//                   primary={
//                     <Link
//                       component={RouterLink}
//                       href={paths.dashboard.three}

//                       color="inherit"
//                     >
//                       {job.name}
//                     </Link>
//                   }
//                   secondary={`Posted date: ${fDate(job.createdAt)}`}
//                   primaryTypographyProps={{ typography: 'subtitle1' }}
//                   secondaryTypographyProps={{
//                     mt: 1,
//                     component: 'span',
//                     typography: 'caption',
//                     color: 'text.disabled',
//                   }}
//                 />

//                 <Stack
//                   spacing={0.5}
//                   direction="row"
//                   alignItems="center"
//                   sx={{ color: 'primary.main', typography: 'caption' }}
//                 >
//                   <Iconify width={16} icon="solar:users-group-rounded-bold" />
//                   {job.description} candidates
//                 </Stack>
//               </Stack>

//               <Divider sx={{ borderStyle: 'dashed' }} />

//               <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
//                 {[
//                   {
//                     label: job.minimum_price,
//                     icon: <Iconify width={16} icon="carbon:skill-level-basic" sx={{ flexShrink: 0 }} />,
//                   },

//                   // {
//                   //   label: job.mploymentTypes.join(', '),
//                   //   icon: <Iconify width={16} icon="solar:clock-circle-bold" sx={{ flexShrink: 0 }} />,
//                   // },
//                   // {
//                   //   label: job.salary.negotiable ? 'Negotiable' : fCurrency(job.salary.price),
//                   //   icon: <Iconify width={16} icon="solar:wad-of-money-bold" sx={{ flexShrink: 0 }} />,
//                   // },
//                   // {
//                   //   label: job.role,
//                   //   icon: <Iconify width={16} icon="solar:user-rounded-bold" sx={{ flexShrink: 0 }} />,
//                   // },
//                 ].map((item) => (
//                   <Stack
//                     key={item.label}
//                     spacing={0.5}
//                     flexShrink={0}
//                     direction="row"
//                     alignItems="center"
//                     sx={{ color: 'text.disabled', minWidth: 0 }}
//                   >
//                     {item.icon}
//                     <Typography variant="caption" noWrap>
//                       {item.label}
//                     </Typography>
//                   </Stack>
//                 ))}
//               </Box>
//             </Card>) }
//           </Box>
//         );
//       }}
//     />
//   );
// }
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify'; // Replace with your Iconify import
import { fDate } from 'src/utils/format-time'; // Replace with your date formatting function
import { paths } from 'src/routes/paths'; // Replace with your routing paths

export function JobSearch({ search, onSearch, filterjob }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

 
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

  
    const matchedJob = filterjob.find((job) =>
      job.name.toLowerCase().includes(value.toLowerCase())
    );

    setSelectedJob(matchedJob || null);
  };

  return (
    <div>
      {/* Search input field */}
      <TextField
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

    
      {selectedJob && (
        <Card sx={{ mt: 2 }}>
          <Stack sx={{ p: 3, pb: 2 }}>
            <Avatar
              alt={selectedJob.name}
              src={selectedJob.bannerImage}
              variant="rounded"
              sx={{ width: 300, height: 300, mb: 2 }}
            />

            <Typography variant="h6">{selectedJob.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Posted on: {fDate(selectedJob.createdAt)}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={0.5} direction="row" alignItems="center" sx={{ color: 'secondary.main', typography: 'caption' }}>
              <Iconify width={16} icon="solar:users-group-rounded-bold" />
              {selectedJob.description} <Iconify width={16} icon="solar:users-group-rounded-bold" />
              {selectedJob.website}
            </Stack>
            {/* <Stack spacing={0.5} direction="row" alignItems="center" sx={{ color: 'primary.main', typography: 'caption' }}>
              <Iconify width={16} icon="solar:users-group-rounded-bold" />
              {selectedJob.website}
            </Stack> */}

            {/* <IconButton href={paths.dashboard.job.details(selectedJob.id)} color="inherit" sx={{ mt: 2 }}>
              <Iconify icon="eva:arrow-forward-outline" />
            </IconButton> */}
          </Stack>
        </Card>
      )}
    </div>
  );
}


