import {
  UPDATE_CONTACT,
  CLEAR_CONTACT,
} from "../types";

import { ContactType } from "../../types";

export const updateContact = (contactInformation: ContactType) => ({
  type: UPDATE_CONTACT,
  payload: contactInformation,
});
export const clearContact = () => ({
  type: CLEAR_CONTACT,
});
