/* eslint-disable react/no-unused-state */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { subredditSelected, setPathValue } from './action';

export class Header extends Component {
  static propTypes = {
    selected: PropTypes.object,
    subreddit: PropTypes.object,
    routing: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    selected: {},
    subreddit: {
      display_name: 'All',
    },
    routing: {
      locationBeforeTransitions: {},
    },
  }

  state = {
    pathType: '',
    pathValue: '',
  };

  componentDidMount() {
    this.detectPath();
  }

  componentWillReceiveProps() {
    this.detectPath();
  }

  detectPath = () => {
    const { dispatch, selected } = this.props;
    const routing = window.location.pathname;

    if (routing) {
      const array = routing.split('/');
      this.setState({ pathType: array[1] });

      if ((selected.pathType !== array[1]) || (selected.pathValue !== array[2])) {
        if (array[1] === 'subreddit') {
          dispatch(subredditSelected(array[2]));
        }

        dispatch(setPathValue(array[1], array[2]));
      }
    }
  }

  renderTitle = ({ pathValue }) =>
    (
      <Typography variant="h6" color="inherit" noWrap>
        { pathValue }
      </Typography>
    )

  render() {
    const { pathValue } = this.props.selected;
    return (
      <div>
        {this.renderTitle({ pathValue })}
      </div>
    );
  }
}

const getSubredditOnNow = (state) => {
  console.log('state.subreddit', state.subreddit);
  return state.subreddit[state.selected.subreddit] || {};
};


const mapStateToProps = state => ({
  selected: state.selected,
  subreddit: getSubredditOnNow(state),
  routing: state.routing,
});

export default connect(mapStateToProps)(Header);
