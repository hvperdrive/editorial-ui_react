import { addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import './storybook.scss';

// Configure global addons
addDecorator(withA11y);
