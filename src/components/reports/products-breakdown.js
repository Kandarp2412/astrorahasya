import { useState } from 'react';
import Chart from 'react-apexcharts';
import { Box, Card, CardHeader, Divider, Tab, Tabs } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const data = {
  categories: ['Analog', 'Automatic', 'Chronograph', 'Diving', 'Smart'],
  series: [
    {
      color: 'rgba(49, 129, 237, 1)',
      data: 65
    },
    {
      color: 'rgba(6, 70, 153, 1)',
      data: 55
    },
    {
      color: 'rgba(81, 119, 236, 1)',
      data: 10
    },
    {
      color: 'rgba(71, 148, 235, 1)',
      data: 5
    },
    {
      color: 'rgba(19, 93, 190, 1)',
      data: 3
    }
  ]
};

export const ProductsBreakdown = (props) => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const chart = {
    options: {
      chart: {
        background: 'transparent',
        toolbar: {
          show: false
        }
      },
      colors: data.series.map((item) => item.color),
      dataLabels: {
        enabled: false
      },
      grid: {
        borderColor: theme.palette.divider,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: 45,
          distributed: true
        }
      },
      theme: {
        mode: theme.palette.mode
      },
      legend: {
        show: false
      },
      xaxis: {
        axisBorder: {
          color: theme.palette.divider,
          show: true
        },
        axisTicks: {
          color: theme.palette.divider,
          show: true
        },
        categories: data.categories,
        labels: {
          style: {
            colors: theme.palette.text.secondary
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: theme.palette.text.secondary
          }
        }
      }
    },
    series: [
      {
        data: data.series.map((item) => item.data)
      }
    ]
  };

  return (
    <Card
      variant="outlined"
      sx={{ height: '100%' }}
      {...props}
    >
      <CardHeader title="Products Breakdown" />
      <Divider />
      <Box sx={{ px: 3 }}>
        <Tabs
          allowScrollButtonsMobile
          onChange={handleTabChange}
          value={tab}
          variant="scrollable"
        >
          <Tab label="Watches" />
          <Tab label="Mousepads" />
          <Tab label="Shoes" />
          <Tab label="Cameras" />
          <Tab label="Phones" />
        </Tabs>
      </Box>
      <Divider />
      <Box sx={{ px: 2 }}>
        <Chart
          height="320"
          type="bar"
          {...chart}
        />
      </Box>
    </Card>
  );
};
