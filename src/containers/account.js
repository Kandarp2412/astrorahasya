import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import { Box, Container, Divider, Tab, Tabs, Typography } from '@material-ui/core';

const tabs = [
  {
    href: '/dashboard/account',
    label: 'General'
  },
  {
    href: '/dashboard/account/notifications',
    label: 'Notifications'
  }
];

export const Account = () => {
  const location = useLocation();

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        flexGrow: 1
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ py: 4 }}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Account Settings
            </Typography>
          </Box>
          <Tabs
            allowScrollButtonsMobile
            value={tabs.findIndex((tab) => tab.href === location.pathname)}
            sx={{ mt: 2 }}
          >
            {tabs.map((option) => (
              <Tab
                component={RouterLink}
                key={option.href}
                label={option.label}
                to={option.href}
                variant="scrollable"
              />
            ))}
          </Tabs>
          <Divider />
        </Box>
        <Outlet />
      </Container>
    </Box>
  );
};
