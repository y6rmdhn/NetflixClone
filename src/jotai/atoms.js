import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const languageL = atomWithStorage("language", "id");
export const tokenAtom = atomWithStorage("token", null);
export const emailStorageAtom = atomWithStorage("email", null);

export const isFavoritedAtom = atom(false)
export const idMovieAtom = atom(null)
export const isOpenModalAtom = atom(false)
export const searchQueryAtom = atom(null)
export const isFetching = atom(true)
export const emailAtom = atom(null)