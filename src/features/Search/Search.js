/* eslint-disable no-class-assign */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { RenderField } from '../../commons';
import { fetchFeedSearch } from './action';

export class Search extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} sm={8}>
            <form onSubmit={handleSubmit} autoComplete="off">
              <Grid item xs container direction="column" spacing={16}>
                <Grid item>
                  <Field name="keyword" label="search" component={RenderField} />
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Search
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>

      </div>
    );
  }
}

Search = reduxForm({
  form: 'searchForm',
  onSubmit: (value, dispatch) => {
    dispatch(fetchFeedSearch({ subreddit: 'all', keyword: value.keyword }));
    // dispatch(reset('searchForm'));
  },
})(Search);

export default Search;
