import React from 'react';
import Calculation from '../../components/Math/Math';

export default class CalcultorDemo extends React.Component {
  Result() {
    let { result } = this.state;
    result = '';
    this.setState({ result });
  }

  render() {
    return (
      <>
        <Calculation first={7} second={4} operator="+" />
        <Calculation first={7} second={3} operator="-" />
        <Calculation first={7} second={20} operator="*" />
        <Calculation first={7} second={0} operator="/" />
        <Calculation first={7} second={4} operator="+">
          {
            (first, second, result) => (
              <p>
                Sum of
                {' '}
                {first}
                {' '}
                and
                {' '}
                {second}
                {' '}
                is equal to
                {' '}
                {result}
                {' '}
              </p>
            )
          }
        </Calculation>
        <Calculation first={3} second={4} operator="+">
          {
            (first, second, result) => (
              <p>
                When we add
                {' '}
                {first}
                {' '}
                with
                {' '}
                {second}
                {' '}
                then we will get
                {' '}
                {result}
                {' '}
                as result
              </p>
            )
          }
        </Calculation>
      </>
    );
  }
}
