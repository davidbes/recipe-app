This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

# Coding guidelines

## Imports

In the project structure I am using barrel imports along with absolute imports. This means that no relative paths should be used (except in scss files). On top of that, all components should be exported through an index.ts file that is located in every main directory.

Example:

```js
import ComponentOne from '../components/Component/ComponentOne';
import ComponentTwo from '../components/Component/ComponentTwo';
```

is now:

```js
import { ComponentOne, ComponentTwo } from 'components';
```

This will ensure that files are as readable as possible.

## Components

- All components are functional and by that using hooks.
- All functions should be arrow functions.
- All props should be defined on top of the component as interfaces or types. If props for that component will not be used again it should be named props to keep the code lines as short as possible.
- All props should be destructurized when component is defined and not in the code block (if used of course).
- Component is exported at the end of the file.
- Each component has it's own file.

Example of a component:

```tsx

interface Props {
    prop1: type;
    prop2: type;
}

const Component: Props => ({prop1, prop2}:Props) => {

    return <div>{prop1} and {prop2}</div>
}

export default Component;

```

## Style

All style should go through .scss files if possible. If a component has different styles depending on props it should be handled using string concatonation in the classname.
