import React from 'react';
import { 
  Typography, 
  Grid, 
  Paper, 
  Box,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  ShoppingCart as OrderIcon,
  Inventory as ProductIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';

const Dashboard = () => {
  // Thông tin tổng quan (demo data)
  const summaryData = [
    { title: 'Tổng đơn hàng', value: '120', icon: <OrderIcon fontSize="large" color="primary" /> },
    { title: 'Tổng sản phẩm', value: '45', icon: <ProductIcon fontSize="large" color="secondary" /> },
    { title: 'Tổng người dùng', value: '85', icon: <PeopleIcon fontSize="large" color="success" /> },
    { title: 'Doanh thu', value: '25.500.000 ₫', icon: <MoneyIcon fontSize="large" color="error" /> },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Thẻ tổng quan */}
        {summaryData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              sx={{ 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column',
                height: 150,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              elevation={3}
            >
              {item.icon}
              <Typography variant="h5" sx={{ mt: 1 }}>
                {item.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.title}
              </Typography>
            </Paper>
          </Grid>
        ))}

        {/* Đơn hàng gần đây */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Đơn hàng gần đây" />
            <CardContent>
              <Typography variant="body2">
                Chưa có dữ liệu đơn hàng.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Sản phẩm bán chạy */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Sản phẩm bán chạy" />
            <CardContent>
              <Typography variant="body2">
                Chưa có dữ liệu sản phẩm.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 