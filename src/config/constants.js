import * as yup from 'yup';

export const PUBLIC_IMAGE_FOLDER = '/images/';

export const DEFAULT_BANNER_IMAGE = 'banners/default.png';

export const banners = ['banners/cloud.jpg', 'banners/dns-server.png', 'banners/full-stack-web-development.jpg', 'banners/load-balancer.png'];

export const total = 5;

const selectOptions = [
  {
    label: 'Cricket',
    value: 'cricket',
  },
  {
    label: 'Football',
    value: 'football',
  },

];

const radioOptionsCricket = [
  {
    label: 'Batsman',
    value: 'batsman',
  },
  {
    label: 'WicketKeeper',
    value: 'wicket-keeper',
  },
  {
    label: 'Bowler',
    value: 'bowler',
  },
  {
    label: 'All-Rounder',
    value: 'all-rounder',
  },
];

const radioOptionsFootball = [
  {
    label: 'Striker',
    value: ' striker',
  },
  {
    label: 'Defender',
    value: 'defender',
  },
];

const schema = yup.object().shape({
  email: yup.string().trim().email().required('Email is a required field')
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, 'invalid email'),
  password: yup.string().required('Password is a required field').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Must contain eight 8 character, at least one UpperCase, one lowercase, one number and one special character'),

});

export {
  radioOptionsCricket, radioOptionsFootball, selectOptions, schema
};
