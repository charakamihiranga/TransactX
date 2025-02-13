import uuid from "react-native-uuid";

export function generateId(prefix: string): string {
    return `${prefix}-${uuid.v4()}`;
}
