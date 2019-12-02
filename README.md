# React Query Builder TS

## Credits

This Typescript Query builder component is heavily inspired by sapientglobalmarkets' Query Builder:

- [React Querybuilder](https://github.com/sapientglobalmarkets/react-querybuilder)

## Getting Started

![Overview](./assets/query-builder-overview.png)

```shell
npm install react-querybuilder-ts --save
```

## Demo

To run a demo of the react-querybuilder being used, clone the project and run yarn install in both the root and example folders.

- In the root directory `yarn install` and `yarn start`
- wait until the root directory finishes compiling
- In the example directory `yarn install`and `yarn start`
- Open brower and go to `http://localhost:1234/`

OR

[See live demo](https://The-Speck.github.io/react-querybuilder-ts/)

## Usage

### Minimal requirements

```jsx
import QueryBuilder from 'react-querybuilder-ts';

const fields = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  { name: 'age', label: 'Age' },
  { name: 'address', label: 'Address' },
  { name: 'phone', label: 'Phone' },
  { name: 'email', label: 'Email' },
  { name: 'twitter', label: 'Twitter' },
  { name: 'isDev', label: 'Is a Developer?', value: false },
];

const handleOnQueryChange = query => {
  console.log(query);
};

const dom = (
  <QueryBuilder columns={fields} onQueryChange={handleOnQueryChange} />
);
```
