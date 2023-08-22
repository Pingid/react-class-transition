A React utility hook for easy and dynamic toggling of CSS classes. Ideal for animating HTML elements based on user interactions or application state changes. Comes with configurable class sequences and time delays for flexible animation effects.

[![Build Status](https://img.shields.io/github/actions/workflow/status/Pingid/react-class-transition/test.yml?branch=main&style=flat&colorA=000000&colorB=000000)](https://github.com/Pingid/react-class-transition/actions?query=workflow:Test)
[![Build Size](https://img.shields.io/bundlephobia/minzip/react-class-transition?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=react-class-transition)
[![Version](https://img.shields.io/npm/v/react-class-transition?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/react-class-transition)
[![Downloads](https://img.shields.io/npm/dt/react-class-transition.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/react-class-transition)

```bash
npm install react-class-transition # or yarn add react-class-transition or pnpm add react-class-transition
```

## Usage

```tsx
import React from 'react'
import { useTransitions } from 'react-class-transition'

const ExampleComponent = () => {
  const [bind, run] = useTransitions({
    myElement: {
      // Apply the visible class wait 15 miliseonds and apply opacity-100
      fadeIn: ['visible', 15, 'opacity-100'],
      // Apply opacity-0 wait 200 miliseconds and apply the invisible class
      fadeOut: ['opacity-0', 150, 'invisible'],
    },
  })

  return (
    <div>
      <div ref={bind('myElement')} className="transition-all duration-150">
        Hello, World!
      </div>
      <button onClick={() => run('fadeIn')}>Fade In</button>
      <button onClick={() => run('fadeOut')}>Fade Out</button>
    </div>
  )
}
```

## License

MIT © [Dan Beaven](https://github.com/Pingid)
