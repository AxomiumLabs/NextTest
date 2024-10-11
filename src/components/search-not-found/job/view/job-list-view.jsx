'use client';

import { useState, useCallback, useEffect } from 'react';
import axios from 'axios'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { orderBy } from 'src/utils/helper';

import { DashboardContent } from 'src/layouts/dashboard';
import {
  _jobs,
  _roles,
  JOB_SORT_OPTIONS,
  JOB_BENEFIT_OPTIONS,
  JOB_EXPERIENCE_OPTIONS,
  JOB_EMPLOYMENT_TYPE_OPTIONS,
} from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { JobList } from '../job-list';
import { JobSort } from '../job-sort';
import { JobSearch } from '../job-search';
import { JobFilters } from '../job-filters';
import { JobFiltersResult } from '../job-filters-result';
import { axiosInstance } from 'src/utils/axios'
import { fetcher } from 'src/utils/axios';
// ----------------------------------------------------------------------

export function JobListView() {
  const openFilters = useBoolean();



  const [sortBy, setSortBy] = useState('latest');
  const [filterlimit, setfilterlimit] = useState([])
  const [limitdata, setlimitData] = useState([])

  // const LimitedData =()=>{
  //   setlimitData([...filter,...filterlimit])
  // }
  const search = useSetState({ query: '', results: [] });







  const limit = 3
  const [count, setcount] = useState(0)
  const [filter, setFilters] = useState([])

  useEffect(() => {
    const dataGet = async () => {
      const data = await limitData()
      setFilters(data)
      console.log('firsteffect', data);
    }
    dataGet()
  }, [])

 
  const handleClick = () => {
const num = count+limit
    setcount(num)
   console.log('countnum',count);
   
    const dataGet = async () => {
      const data = await limitData(num)
      console.log('buttononclick', data,count);
      setFilters(filter.push(...data))
      console.log('filters',filter);
      
    }
    dataGet()
  }
  const limitData = async (count=0) => {
    const token = localStorage.getItem('token')
    try {

      const res = await fetcher(`${getUrl}/customers/restaurants/Al%20Barsha%20First?offset=${count}&limit=${limit}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        }
      }
      );

      return res
    } catch (err) {
      console.log(err);
    }
    return []
  }



  const filters = useSetState({
    roles: [],
    locations: [],
    benefits: [],
    experience: 'all',
    employmentTypes: [],
  });
  const filtering = useSetState({
    name: [],

  });
  const dataFiltered = applyFilter({ inputData: filter, filtering: filtering.state, sortBy });

  const canReset =
    filters.state.roles.length > 0 ||
    filters.state.locations.length > 0 ||
    filters.state.benefits.length > 0 ||
    filters.state.employmentTypes.length > 0 ||
    filters.state.experience !== 'all';

  // const notFound = !dataFiltered.length && canReset;
  // const getLimitURL = process.env.NEXT_PUBLIC_GETLIMIT_URL
  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);
  const getUrl = process.env.NEXT_PUBLIC_GET_URL
  const handleSearch = useCallback(
    (inputValue) => {
      search.setState({ query: inputValue });

      if (inputValue) {
        const results = filter.filter(
          (job) => job.name.toLowerCase().indexOf(search.state.query.toLowerCase()) !== -1
        );

        search.setState({ results });
      }
    },
    [search]
  );

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <JobSearch search={search} filterjob={filter} onSearch={handleSearch} />

      <Stack direction="row" spacing={1} flexShrink={0}>
        <JobFilters
          filters={filters}
          canReset={canReset}
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          options={{
            roles: _roles,
            benefits: JOB_BENEFIT_OPTIONS.map((option) => option.label),
            employmentTypes: JOB_EMPLOYMENT_TYPE_OPTIONS.map((option) => option.label),
            experiences: ['all', ...JOB_EXPERIENCE_OPTIONS.map((option) => option.label)],
          }}
        />

        <JobSort sort={sortBy} onSort={handleSortBy} sortOptions={JOB_SORT_OPTIONS} />
        {/* <JobSearch jobs={filter}/> */}
      </Stack>
    </Stack>
  );



  const renderResults = <JobFiltersResult filters={filters} totalResults={dataFiltered.length} />;

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="List"
        links={[
          // { name: 'Dashboard', href: paths.dashboard.root },
          // { name: 'Job', href: paths.dashboard.job.root },
          { name: 'List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.group.five}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New job
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
        {renderFilters}

        {canReset && renderResults}
      </Stack>
      {/* {notFound && <EmptyContent filled sx={{ py: 10 }} />} */}
      <JobList jobs={filter} />
      <Button

        onClick={handleClick}
        startIcon={<Iconify icon="mingcute:add-line" />}
      >
        load more
      </Button>

    </DashboardContent>
  );
}
const applyFilter = ({ inputData, filtering, sortBy }) => {


  const { name } = filtering;
  // Sort by
  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }
  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  // Filters
  // if (employmentTypes.length) {
  //   inputData = inputData.filter((job) =>
  //     job.employmentTypes.some((item) => employmentTypes.includes(item))
  //   );
  // }

  // if (experience !== 'all') {
  //   inputData = inputData.filter((job) => job.experience === experience);
  // }

  // if (roles.length) {
  //   inputData = inputData.filter((job) => roles.includes(job.role));
  // }

  if (name.length) {
    inputData = inputData.filter((job) => job.locations.some((item) => locations.includes(item)));
  }

  // if (benefits.length) {
  //   inputData = inputData.filter((job) => job.benefits.some((item) => benefits.includes(item)));
  // }

  return inputData;
};
