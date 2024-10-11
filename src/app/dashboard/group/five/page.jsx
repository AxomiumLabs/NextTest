import { JobListView } from 'src/components/search-not-found/job/view';
import { CONFIG } from 'src/config-global';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Page five | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return < JobListView/>;
}
