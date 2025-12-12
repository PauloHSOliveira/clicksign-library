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

### Envelopes (API v3)

Envelopes are the new architectural pattern in Clicksign API v3 where documents and signers are grouped together. This provides a more organized way to manage multi-document signing workflows.

#### Create Envelope

Creates a new envelope in ClickSign API v3.

```typescript
import { CreateEnvelope, EnvelopeStatus } from 'clicksign-library';

const createNewEnvelope = async () => {
  const data: CreateEnvelope = {
    name: 'Contrato de Prestação de Serviço',
    locale: 'pt-BR',
    auto_close: true,
    sequence_enabled: false,
    remind_interval: 7,
  };

  const response = await clickSignAPI.envelopes.createEnvelope(data);
  console.log(response.envelope);
  // Response will include envelope with status 'draft'
}
```

#### List Envelopes

List all envelopes with optional pagination.

```typescript
const listAllEnvelopes = async () => {
  // List first page
  const response = await clickSignAPI.envelopes.listEnvelopes();
  console.log(response.envelopes);

  // List specific page
  const page2 = await clickSignAPI.envelopes.listEnvelopes(2);
  console.log(page2.envelopes);
}
```

#### Get Envelope Details

Get detailed information about a specific envelope.

```typescript
const getEnvelopeDetails = async (envelopeKey: string) => {
  const response = await clickSignAPI.envelopes.getEnvelope(envelopeKey);
  console.log(response.envelope);
  // Response includes envelope with all documents and signers
}
```

#### Update Envelope

Update envelope properties.

```typescript
import { UpdateEnvelope } from 'clicksign-library';

const updateEnvelopeInfo = async (envelopeKey: string) => {
  const data: UpdateEnvelope = {
    name: 'Updated Contract Name',
    auto_close: false,
    remind_interval: 14,
  };

  const response = await clickSignAPI.envelopes.updateEnvelope(envelopeKey, data);
  console.log(response.envelope);
}
```

#### Cancel Envelope

Cancel an envelope.

```typescript
const cancelEnvelopeFlow = async (envelopeKey: string) => {
  const response = await clickSignAPI.envelopes.cancelEnvelope(envelopeKey);
  console.log(response.envelope.status); // Will be 'canceled'
}
```

#### Delete Envelope

Delete an envelope (only allowed for draft envelopes).

```typescript
const deleteEnvelopeIfDraft = async (envelopeKey: string) => {
  await clickSignAPI.envelopes.deleteEnvelope(envelopeKey);
  console.log('Envelope deleted successfully');
}
```

#### Add Document to Envelope

Add an existing document to an envelope.

```typescript
import { AddDocumentToEnvelope } from 'clicksign-library';

const addDocumentToEnvelopeFlow = async (envelopeKey: string, documentKey: string) => {
  const data: AddDocumentToEnvelope = {
    document_key: documentKey,
  };

  const response = await clickSignAPI.envelopes.addDocumentToEnvelope(envelopeKey, data);
  console.log(response.envelope.documents);
}
```

#### Add Signer to Envelope

Add a signer to an envelope.

```typescript
import { AddSignerToEnvelope } from 'clicksign-library';

const addSignerToEnvelopeFlow = async (envelopeKey: string, signerKey: string) => {
  const data: AddSignerToEnvelope = {
    signer_key: signerKey,
    sign_as: 'sign',
    refusable: true,
    group: 1, // Optional: for signature sequence
  };

  const response = await clickSignAPI.envelopes.addSignerToEnvelope(envelopeKey, data);
  console.log(response.envelope.signers);
}
```

#### Complete Envelope Workflow Example

Here's a complete example of creating an envelope, adding documents and signers:

```typescript
const completeEnvelopeWorkflow = async () => {
  // 1. Create envelope
  const envelope = await clickSignAPI.envelopes.createEnvelope({
    name: 'Service Contract Package',
    locale: 'pt-BR',
    auto_close: true,
    sequence_enabled: false,
    remind_interval: 7,
  });

  console.log('Envelope created:', envelope.envelope.key);

  // 2. Add documents
  await clickSignAPI.envelopes.addDocumentToEnvelope(envelope.envelope.key, {
    document_key: 'existing_document_key',
  });

  // 3. Add signers
  await clickSignAPI.envelopes.addSignerToEnvelope(envelope.envelope.key, {
    signer_key: 'existing_signer_key',
    sign_as: 'sign',
    refusable: true,
  });

  // 4. Get complete envelope details
  const finalEnvelope = await clickSignAPI.envelopes.getEnvelope(envelope.envelope.key);
  console.log('Complete envelope:', finalEnvelope.envelope);
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
