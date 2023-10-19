export interface Condition {
    Id: number; // ใช้ "number" แทน "int"
    Symptom: string;
    Description: string;
}

export interface Knowledge {
    Id: number; // ใช้ "number" แทน "Int"
    NameRule: string;
    Conditions: Condition[];
}

// let data: NameRule[] = [];
