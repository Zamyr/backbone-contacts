import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface PropTypes {
    msg: {
        message: string,
        type: string
    }
}

export default function Alerts(props: PropTypes) {
    const {msg} = props
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={msg.type}>
        {msg.message}
      </Alert>
    </Stack>
  );
}