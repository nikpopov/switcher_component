import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

// eslint-disable-next-line import/named
import { Switcher, SwitcherProps } from './Switcher';

const stories = storiesOf('Controls / Switcher', module);

stories.add('Switcher variants', () => {
  const [value, setValue] = useState<boolean>(true);
  const props: SwitcherProps = {
    disabled: boolean('isDisabled', false),
    value,
    onChange: (v) => {
      action('clicked')(v);
      setValue(v);
    },
    // eslint-disable-next-line no-console
    changeValue: (val) => console.log('val = ', val),
  };

  return <Switcher {...props} />;
});
