import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    marginTop: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left',
    whiteSpace: 'pre-line'
  },
  chip: {
    marginRight: theme.spacing(1),
    display: 'inline-block'
  },
  description: {
    marginTop: theme.spacing(2)
  },
  option: {
    margin: theme.spacing(2)
  }
}))

const SkeletonPage = () => {
  // Classes for styles usages
  const classes = useStyles()
  return (
    <div className="SkeletonPage">
      <Card className={classes.root} elevation={3}>
        <CardHeader
          avatar={<Skeleton variant="circle"><Avatar /></Skeleton>}
          title={<Skeleton />}
          subheader={<Skeleton />}
          titleTypographyProps={{ variant: 'inherit', component: 'strong' }}
          subheaderTypographyProps={{ variant: 'caption', component: 'small' }}
        />
        <CardContent>
          <Skeleton className={classes.chip} width={60} height={40} />
          <Skeleton className={classes.chip} width={60} height={40} />
          <Typography className={classes.description} variant="body2" component="p">
            <Skeleton />
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography variant="h6" component="h2">
            <Skeleton />
          </Typography>
          <Skeleton variant="text" className={classes.option} />
          <Skeleton variant="text" className={classes.option} />
          <Skeleton variant="text" className={classes.option} />
          <Skeleton variant="text" className={classes.option} />
        </CardContent>
      </Card>
      <Card className={classes.root} elevation={3}>
        <CardHeader
          avatar={<Skeleton variant="circle"><Avatar /></Skeleton>}
          title={<Skeleton />}
          subheader={<Skeleton />}
          titleTypographyProps={{ variant: 'inherit', component: 'strong' }}
          subheaderTypographyProps={{ variant: 'caption', component: 'small' }}
        />
        <CardContent>
          <Skeleton className={classes.chip} width={100} height={40} />
          <Skeleton className={classes.chip} width={100} height={40} />
          <Typography className={classes.description} variant="body2" component="p">
            <Skeleton />
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography variant="h6" component="h2">
            <Skeleton />
          </Typography>
          <Skeleton variant="text" className={classes.option} />
          <Skeleton variant="text" className={classes.option} />
          <Skeleton variant="text" className={classes.option} />
          <Skeleton variant="text" className={classes.option} />
        </CardContent>
      </Card>
    </div>
  )
}

export default SkeletonPage
