import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withFigma } from '@dreipol/storybook-figma-addon';

addDecorator(withFigma({
  apiToken: process.env.DEV_TOKEN,
  projectID: 'zQ2akNmaUWMagyfvw6dWfT',
}));

configure(require.context('../stories', true, /\.stories\.js$/), module);
