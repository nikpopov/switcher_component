import React from 'react';
import {
  render, fireEvent, cleanup, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';

// eslint-disable-next-line import/named
import { Switcher, SwitcherProps } from './Switcher';

const onChangeEvent = jest.fn();

describe('Switcher test', () => {
  const props: SwitcherProps = {
    onChange: onChangeEvent,
  };

  afterEach(cleanup);

  test('renders switcher component', () => {
    const { getByTestId, asFragment } = render(
      <Switcher {...props} />,
    );
    expect(getByTestId('switcher-test')).toBeDefined();
    expect(getByTestId('switcher-test')).toBeEnabled();
    expect(getByTestId('switcher-test')).toBeValid();
    expect(getByTestId('switcher-test')).toBeInTheDocument();
    expect(getByTestId('switcher-test').getElementsByTagName("input")).toHaveLength(1);
    expect(asFragment()).toMatchSnapshot();
  });

  test('switcher disabled', () => {
    const { getByTestId, getByRole } = render(
      <Switcher {...props} disabled />,
    );
    expect(getByTestId('switcher-test')).toBeDefined();
    expect(getByTestId('switcher-test')).toBeInTheDocument();
    expect(getByRole("checkbox")).toBeDisabled();
  });

  test('switcher checked', () => {
    const { getByTestId, getByRole } = render(
      <Switcher {...props} value />,
    );
    expect(getByTestId('switcher-test')).toBeDefined();
    expect(getByTestId('switcher-test')).toBeInTheDocument();
    expect(getByRole("checkbox")).toBeChecked();
  });

  test('switcher onchange triggered', () => {
    const { getByTestId, getByRole } = render(
      <Switcher {...props} value onChange={onChangeEvent} />,
    );
    expect(getByTestId('switcher-test')).toBeDefined();
    expect(getByTestId('switcher-test')).toBeInTheDocument();
    expect(getByRole("checkbox")).toBeChecked();

    fireEvent.click(getByRole("checkbox"));
    expect(props.onChange).toBeCalled();
    waitFor(() => expect(getByRole("checkbox")).not.toBeChecked(), { timeout: 250 });
  });

  test('switcher disabled onchange', () => {
    const { getByTestId, getByRole } = render(
      <Switcher {...props} value disabled onChange={onChangeEvent} />,
    );
    expect(getByTestId('switcher-test')).toBeDefined();
    expect(getByTestId('switcher-test')).toBeInTheDocument();
    expect(getByRole("checkbox")).toBeDisabled();
    expect(getByRole("checkbox")).toBeChecked();

    fireEvent.click(getByRole("checkbox"));
    waitFor(() => expect(getByRole("checkbox")).toBeChecked(), { timeout: 250 });
  });
});
