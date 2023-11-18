# ClickSign Library (Node.js)

This is a Node.js library to facilitate contract sending using the ClickSign REST API. The library is written in TypeScript and uses functional programming to provide an easy-to-use and scalable interface.

## Implemented Features

The library already has the following features implemented:

- Send contracts to ClickSign
- Retrieve the list of documents in ClickSign

## How to Use

### Installation

To use the library in your project, you can install it via npm or yarn:

```bash
npm install clicksign-library --save
```

or

```bash
yarn add clicksign-library
```

#### Configuration

Before using the library, you need to configure the ClickSign API with your access key, and the enviroment:

```typescript
import { clickSignService } from 'clicksign-library';
import { ClickSignEnvironment } from 'clicksign-library/types';

const accessToken = 'YOUR_CLICKSIGN_ACCESS_KEY';
const environment = ClickSignEnvironment.Production;

const clickSignAPI = clickSignService({
  apiKey: accessToken,
  environment,
  debug: false, // optional, default is false
  maxRequests: 10, // optional, default is 10
  perMilliseconds: 2000, // optional, default is 2000
  retryConfig: { retries: 3 }, // optional, default is { retries: 3 }
});
```
### Documents

#### Create Document by Template

To create a document by template on ClickSign, you can use this function:

```typescript
async function createDocumentByTemplate() {
  try {
    const data = {
      path: '/Models/Test-123.docx',
      templateKey: 'a250d85b-1688-4145-838a-122f4a4febf7',
      data: {
        company: 'Test',
        full_address: 'Test Address',
        zip: '31080-231',
        cnpj: '12.123.321/0001-12',
        value: '$ 10.0000',
      },
    } as TemplateDocument;

    const document = await clickSignService.documents.createDocumentByTemplate(data);
    console.log(document);
  } catch (error) {
    console.error('Error creating document by template:', error.message);
  }
}
```

#### Create Document by Upload

To create a document by upload on ClickSign, you can use this function:

```typescript
async function createDocumentByUpload() {
  try {
    const data = {
      path: "/document.pdf",
      content_base64: 'base64 file' ,
      deadline_at: "2020-01-05T14:30:59-03:00", // optional
      auto_close: true, // optional - default true
      remind_interval: 14, // optional - default 3
      locale: "pt-BR", // optional - default pt-BR
      sequence_enabled: false, // optional - default fase
      block_after_refusal: true // optional - default true
    } as CreateDocumentByUpload;

    const document = await clickSignService.documents.createDocumentByUpload(data);
    console.log(document);
  } catch (error) {
    console.error('Error creating document by template:', error.message);
  }
}
```

#### List Documents
To retrieve the list of documents in ClickSign, you can use the getDocuments function:

```typescript
  const fetchDocuments = async () => {
    const documents = await clickSignAPI.documents.getDocuments();
    return documents;
  }
```

#### Get Document by key
To get a document by key in ClickSign, you can use:

```typescript
  const fetchDocument = async (documentKey: string) => {
    const document = await clickSignAPI.documents.getDocument(documentKey);
  }
```

#### Cancel document by key:
To Cancel a document by key, you can use:

```typescript
  const cancelDocument = async (documentKey: string) => {
    await clickSignAPI.documents.cancelDocument(documentKey);
  }
```

#### Delete document by key:
To Delete a document by key, you can use:

```typescript
  const deleteDocument = async (documentKey: string) => {
    await clickSignAPI.documents.deleteDocument(documentKey);
  }
```

### Signers

#### Create Signer

Creates a new signer in ClickSign.

```typescript
  const createNewSigner = async () => {
     const data: CreateSigner = {
      auths: ['email'],
      email: 'test@example.com',
      name: 'Test User',
      documentation: '', // cpf number
      birthday: new Date('11/11/1998'),
      phone_number: '11988667788',
    };

    await clickSignAPI.signers.createSigner(data);
  }
```

#### Get a Signer

Get a signer in ClickSign.

```typescript
  const getASigner = async () => {
    const signerKey = 'key'
    const signerData = await clickSignAPI.signers.getSigner(signerKey);
    console.log({ signerData })
  }
```

#### Add a Signer in Document

Get a signer in ClickSign.

```typescript
  const addAginerInDoc = async () => {
    const data: AddSignerInDocument = {
      document_key: document.key,
      signer_key: signerKey,
      sign_as: 'sign',
      message: 'Olá, assine aqui',
      refusable: true,
    };
    await clickSignAPI.signers.addSignerInDocument(data);
  }
```

#### Add a Signer in Document

To add signer in Document in ClickSign.

```typescript
  const addAginerInDoc = async () => {
    const data: AddSignerInDocument = {
      document_key: document.key,
      signer_key: signerKey,
      sign_as: 'sign',
      message: 'Olá, assine aqui',
      refusable: true,
    };
    await clickSignAPI.signers.addSignerInDocument(data);
  }
```

#### Remove Signer of Document

To remove a signer of Document in ClickSign.

```typescript
  const removeSignerofDoc = async () => {
    const { document } = await clickSignAPI.documents.getDocument(documentKey);

    await clickSignAPI.signers.removeSignerOfDocument(
      document.signers[0].list_key,
    );
  }
```

## Contribution

Contributions are welcome! If you want to contribute to this project, feel free to open an issue or submit a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for more information.

This is a brief guide on how to use the ClickSign library in your Node.js project. Feel free to expand the README with more relevant information for users and developers. Remember to keep the README updated as new features are added to the project. Happy coding!

```css

Make sure to replace `YOUR_CLICKSIGN_ACCESS_KEY` with your actual ClickSign access key in the code. This README.md file provides instructions on how to install, configure, and use the ClickSign library in your project. It also includes a contribution section and license information to facilitate collaboration from other developers.

Remember to keep the README.md updated with relevant information for the project and its users. A good README is essential for providing clear and friendly documentation and helping users understand how to use the library effectively.

```
