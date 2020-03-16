import { addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

// Configure global addons
addDecorator(withA11y);
