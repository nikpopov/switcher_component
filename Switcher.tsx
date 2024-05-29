import React, { useState, useEffect } from 'react';
import { Switch } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export type EventType = React.MouseEvent<HTMLButtonElement, MouseEvent>;

export interface SwitcherProps {
  label?: string;
  value?: string | boolean;
  checked?: boolean;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (checked: boolean, e: EventType) => void;
  // eslint-disable-next-line no-unused-vars
  changeValue?: (checked: boolean, e: EventType) => void;
}

export const Switcher: React.FC<SwitcherProps> = ({
  label = '',
  value,
  disabled = false,
  onChange,
  changeValue,
  ...rest
}) => {
  const [v, setVv] = useState<string | boolean | undefined>(value);
  const handleOnChange = (e: EventType): void => {
    if (changeValue) {
      changeValue(!v, e);
    }
    if (onChange && !disabled) {
      setVv(!v);
      onChange(!v, e);
    }
  };

  useEffect(() => {
    setVv(value);
  }, [value]);

  return (
    <FormControlLabel
      data-testid="switcher-test"
      className="Switcher"
      label={label}
      control={(
        <Switch
          {...rest}
          checked={!!value}
          value={value}
          disabled={disabled}
          onClick={handleOnChange}
        />
      )}
    />
  );
};
