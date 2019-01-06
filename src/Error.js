import React from 'react';

function Error(props) {
  if (props.error === "") { return <div /> }
  return (
    <h3>Error: {props.error}</h3>
  );
}

export default Error;
