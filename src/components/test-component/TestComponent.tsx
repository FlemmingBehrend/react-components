import React from 'react';

export interface TestComponentProps {
  label: string;
}

const TestComponent = (props: TestComponentProps) => {
  return <button>Test {props.label}</button>;
};

export default TestComponent;
