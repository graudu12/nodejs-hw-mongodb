import { Contacts } from '../models/contact.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const filters = { userId };
  if (typeof filter.contactType !== 'undefined') {
    filters.contactType = filter.contactType;
  }
  if (typeof filter.isFavourite !== 'undefined') {
    filters.isFavourite = filter.isFavourite;
  }

  const [totalItems, contacts] = await Promise.all([
    Contacts.countDocuments(filters),
    Contacts.find(filters)
      .select('+photo')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages > page,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contacts.findOne({ _id: contactId, userId });
  return contact;
};
export const createContact = async (payload) => {
  const contact = await Contacts.create(payload);
  return contact;
};
export const updateContact = async (contactId, userId, payload) => {
  const updatedContact = await Contacts.findOneAndUpdate(
    {
      _id: contactId,
      userId,
    },
    payload,
    {
      new: true,
    },
  );
  return updatedContact;
};
export const deleteContact = async (contactId, userId) => {
  const deletedContact = await Contacts.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return deletedContact;
};
