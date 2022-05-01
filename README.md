# NFTCheese Chrome Extension UIs

This repository is to build frontend components for NFTCheese

> Each component is coded along with its storybook. Check out https://storybook.js.org/docs/ember/writing-stories/introduction.

## Development

```
npm install
npm run storybook
```

## Important Frontend Libraries

### 1. Chakra
This project uses no other styling libraries other than [Chakra](https://chakra-ui.com/). Please do get yourself familiar with it.

There's a custom theme already applied and extra css variables defined in [theme.js](https://github.com/NFTCheese/NFTCheeseChromeExtensionPublic/blob/master/src/theme.ts).

> Note: All of the components are styled for both **dark mode & light mode**. Please do check the code & the stories of components in this repo.

### 2. Visx
This project is [Visx](https://github.com/airbnb/visx) to build interactive charts & graphs. This library brings flexibility and freedom to make charts as interactive & customizable as we want.

There's a chart built with Visx where you can take example from: [src/components/SalesActivity.tsx](https://github.com/NFTCheese/NFTCheeseChromeExtensionPublic/blob/master/src/component/SalesActivity.tsx)

### 3. Axios / API requests
We use Axios and to make api request to the server, please do use function `cheeseApiRequest` in [src/utils/api.tsx](https://github.com/NFTCheese/NFTCheeseChromeExtensionPublic/blob/master/src/utils/api.ts#L368). This functions inject `accessToken` and other needed headers to autheticate the request.
