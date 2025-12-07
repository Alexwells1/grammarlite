import type { GrammarSuggestion } from "@/types";
import axios from "axios";

const API_URL = "https://grammarlite-server.onrender.com/correct";

export async function checkGrammar(
  text: string,
  mode: "basic" | "deep" = "basic"
): Promise<GrammarSuggestion> {
  try {
    const res = await axios.post(API_URL, { text, mode });
    console.log("Grammar API response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Grammar API error:", err);
    return { text };
  }
}
