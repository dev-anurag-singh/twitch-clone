import { Navigation } from './navigation';
import { Toggle } from './toggle';
import { Wrapper } from './wrapper';

export const CreatorDashboardSidebar = () => {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
};
