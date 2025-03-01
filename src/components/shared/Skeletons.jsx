import { Skeleton, Stack } from '@mui/material';

const Skeletons = () => {
  return (
    <div className='flex items-center justify-center w-full'>
      <Stack spacing={1}>
        <Skeleton variant="rounded" height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Stack>
    </div>
  )
}

export default Skeletons;