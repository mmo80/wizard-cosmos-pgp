import { IDetails, IFormData } from '../models';

export default function updateAction(state: IDetails, payload: IFormData) {
  return {
    ...state,
    yourDetails: {
      ...state.yourDetails,
      ...payload
    }
  };
}
