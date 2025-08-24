import type { Item } from "@/configs/types";


export function parseItems(jsonString: string): Item[] {
  try {
    const data = JSON.parse(jsonString);
    if (!Array.isArray(data)) {
      throw new Error("JSON is not an array");
    }
    return data as Item[];
  } catch (error) {
    console.error("Failed to parse items:", error);
    return [];
  }
}
