import React from 'react';
import { render } from '@testing-library/react';

import TestCompoent from './';

describe('TestComponent', () => {
  test('renders the TestComponent component', () => {
    render(<TestCompoent label="Hello world!" />);
  });
});
