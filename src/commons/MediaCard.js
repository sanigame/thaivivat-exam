/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  card: {
    marginBottom: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

const MediaCard = ({ classes, detail }) => (
  <Card className={classes.card}>
    <CardHeader
      avatar={
        <Avatar aria-label="Recipe" className={classes.avatar}>
          R
        </Avatar>
      }
      title={detail.author}
      subheader={detail.url}
    />
    {
      detail.preview ?
        <CardMedia
          className={classes.media}
          image={detail.thumbnail}
          title={detail.title}
        /> : null
    }

    <CardContent>
      <Typography component="p">
        {detail.title}
      </Typography>
    </CardContent>

  </Card>
);

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  detail: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
