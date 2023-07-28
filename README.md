# ClickSign Library (Node.js)

This is a Node.js library to facilitate contract sending using the ClickSign REST API. The library is written in TypeScript and uses functional programming to provide an easy-to-use and scalable interface.

## Implemented Features

The library already has the following features implemented:

- Send contracts to ClickSign
- Retrieve the list of documents in ClickSign

## How to Use

### Installation

To use the library in your Node.js project, you can install it via npm or yarn:

```bash
npm install clicksign-library --save
```

or

```bash
yarn add clicksign-library
```

Configuration
Before using the library, you need to configure the ClickSign API with your access key, and the enviroment:

```typescript
import { clickSignService } from 'clicksign-library';
import { ClickSignEnvironment } from 'clicksign-library/types';

const accessToken = 'YOUR_CLICKSIGN_ACCESS_KEY';
const environment = ClickSignEnvironment.Production;

const clickSignAPI = clickSignService(accessToken, environment);
```

Send Contract
To send a contract to ClickSign, you can use the sendDocument function:

```typescript
async function fetchDocuments() {
  try {
    const documents = await clickSignService.getDocuments();
    console.log(documents);
  } catch (error) {
    console.error('Error fetching documents:', error.message);
  }
}
// to-do
async function createDocumentByTemplate() {
  try {
    const document = await clickSignService.createDocumentByTemplate();
    console.log(document);
  } catch (error) {
    console.error('Error creating document by template:', error.message);
  }
}

// Call the functions to use the ClickSign service
fetchDocuments();
createDocumentByTemplate();
```

List Documents
To retrieve the list of documents in ClickSign, you can use the getDocuments function:

Contribution

Contributions are welcome! If you want to contribute to this project, feel free to open an issue or submit a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for more information.

This is a brief guide on how to use the ClickSign library in your Node.js project. Feel free to expand the README with more relevant information for users and developers. Remember to keep the README updated as new features are added to the project. Happy coding!

```css

Make sure to replace `YOUR_CLICKSIGN_ACCESS_KEY` with your actual ClickSign access key in the code. This README.md file provides instructions on how to install, configure, and use the ClickSign library in your Node.js project. It also includes a contribution section and license information to facilitate collaboration from other developers.

Remember to keep the README.md updated with relevant information for the project and its users. A good README is essential for providing clear and friendly documentation and helping users understand how to use the library effectively.

```
