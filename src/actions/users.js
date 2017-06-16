// fluxのaction
import { createAction } from "redux-actions";

import Act from "./Types";

export const signedOut = createAction(Act.SIGNED_OUT);// null
export const signingOut = createAction(Act.SIGNING_OUT);// null
export const signInFailed = createAction(Act.SIGN_IN_FAILED);// null
export const signedIn = createAction(Act.SIGNED_IN);// null
