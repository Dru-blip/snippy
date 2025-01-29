import { Snippet } from "@/types"
import {atom} from "jotai"

export const selectedSnippetAtom=atom<Snippet|null>(null)

export const searchQueryAtom=atom<string>("")