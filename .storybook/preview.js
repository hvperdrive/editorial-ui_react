import { addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import '@a-ui/flexboxgrid/dist/flexboxgrid.css';

import './storybook.scss';

// Configure global addons
addDecorator(withA11y);
