import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as exampleActions } from '../../redux/modules/example';
import { exampleSelector } from '../../redux/selectors/exampleSelector';
import { Example, ExampleWithError } from '../../common/components/Example';
import { ErrorBoundary } from '../../common/components/Utilities';

require('../../../style/index.css');

const mapStateToProps = state => ({
  example: exampleSelector(state),
});

const mapDispatchToProps = {
  ...exampleActions,
};

@connect(mapStateToProps, mapDispatchToProps)
class ExampleView extends Component {
  static PropTypes = {
    example: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.getAwesomeCode();
  }

  render() {
    return (
      <div>
        <Example {...this.props} />
        <ErrorBoundary>
          <ExampleWithError {...this.props} />
        </ErrorBoundary>
      </div>
    )
  }
}

export default ExampleView;
