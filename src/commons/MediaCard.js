/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import { Link } from 'react-router-dom';

const styles = {
  card: {
    maxWidth: '100%',
    marginBottom: 20,
  },
  media: {
    height: 300,
  },
};

const MediaCard = ({ classes, detail }) => (
  <Card className={classes.card}>
    <CardActionArea>
      <CardMedia
        className={classes.media}
        image={detail.thumbnail}
        title={detail.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {detail.subreddit}
        </Typography>
        <Typography component="p">
          {detail.title}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  detail: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
