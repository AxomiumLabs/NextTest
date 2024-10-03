import { CONFIG } from 'src/config-global';

import { BlankView } from 'src/sections/blank/view';
import Views from 'src/sections/tableview/views';
import { UserListView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Page one" />;

}
