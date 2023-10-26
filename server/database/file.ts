import * as fs from "fs";
import { Knowledge } from "../../client/src/view/model/model";

const KNOWLEDGE = "./database/data/knowledge.json";

export function Savefile(data: Knowledge[]) {
  const jsonData: string = JSON.stringify(data, null, 2);
  
  fs.writeFile(KNOWLEDGE, jsonData, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
}

export function LoadFile(): string | null {
  let data: string = "";

  if (fs.existsSync(KNOWLEDGE)) {
    try {
      data = fs.readFileSync(KNOWLEDGE, "utf8");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอ่านไฟล์:", error);
      return null
    }
  } else {
    console.log(`ไฟล์ "${KNOWLEDGE}" ไม่พบ`);
    return null
  }

  return data;
}
