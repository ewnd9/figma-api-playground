import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';

export default {
  title: 'Welcome',
  parameters: {
    figma: {
      ids: ['3%3A0'].join(','),
      names: ['test']
    },
  },
};

export const toStorybook = () => <Welcome showApp={linkTo('Button')} />;

toStorybook.story = {
  name: 'to Storybook',
  parameters: {
    figma: {
      ids: ['3%3A0'].join(','),
      names: ['test']
    },
  },
};

export const toStorybook2 = () => <Welcome showApp={linkTo('Button')} />;

toStorybook2.story = {
  name: 'to Storybook 2',
  parameters: {
    figma: {
      ids: ['3%3A0'].join(','),
      names: ['test']
    },
  },
};
