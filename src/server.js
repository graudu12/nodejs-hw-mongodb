import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
//import { getAllContacts, getContactById } from './services/contacts.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(getEnvVar('PORT', '3000'));
export const setupServer = () => {
  const app = express();

  //app.use(express.json());
  //app.use(cors());

  //app.use(
  // pino({
  //  transport: {
  //    target: 'pino-pretty',
  //  },
  // }),
  // );

  //app.get('/contacts', async (req, res) => {
  // const contacts = await getAllContacts();
  // res.status(200).json({
  //  status: 200,
  //  message: 'Successfully found contacts',
  //    data: contacts,
  //   });
  // });

  //app.get('/contacts/:contactId', async (req, res) => {
  // const contactId = req.params.contactId;
  // const contact = await getContactById(contactId);

  // if (!contact) {
  //  res.status(404).json({
  //     message: 'Contact not found',
  //   });
  //   return;
  // }

  // res.status(200).json({
  //   status: 200,
  //   message: `Successfully found contact with id ${contactId}!`,
  //   data: (contact, null, 2),
  //  });
  // });

  // app.use((req, res) => {
  //  res.status(404).json({
  //    message: 'Not found',
  //  });
  // });

  // app.use((err, req, res, next) => {
  //  res.status(500).json({
  //    error: err.message,
  //  });
  // });

  // app.listen(PORT, () => {
  //   console.log(`Server is running on port ${PORT}`);
  // });
  //};
  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
