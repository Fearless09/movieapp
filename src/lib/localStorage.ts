import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveData<T>(key: string, value: T): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error(`Error saving data for key ${key}: ${msg}`);
    throw Error(`Error saving data for key ${key}: ${msg}`);
  }
}

export async function getData<T>(key: string, initialValue: T): Promise<T> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : initialValue;
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error(`Error getting data for key ${key}: ${msg}`);
    throw Error(`Error getting data for key ${key}: ${msg}`);
  }
}

export async function removeData(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error(`Error removing data for key ${key}: ${msg}`);
    throw Error(`Error removing data for key ${key}: ${msg}`);
  }
}
