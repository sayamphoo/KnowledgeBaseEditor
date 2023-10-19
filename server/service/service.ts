import { LoadFile, Savefile } from "../database/file";
import { Knowledge, Condition } from "../../client/src/view/model/model";

let data: Knowledge[] = [];

export function GetKnowledge() : Knowledge[]{

  let know: string | null = LoadFile();
  if (typeof know === "string") {
    data = JSON.parse(know);
  }
  return data
}

export function SaveKnowledge(knowledge : Knowledge[]) {
  Savefile(knowledge)
}







// export function addKnowledge(knowName: string) {
//   let index: number = data.findIndex(
//     (knowledge) => knowledge.NameRule === knowName
//   );

//   if (index === -1) {
//     data.push({
//       Id: Math.random(),
//       NameRule: knowName,
//       Conditions: [],
//     });
//   }
// }

// export function addRule(IdKnowledge: number, Symptom: string, Description: string) {
//   const index: number = data.findIndex(
//     (nameRule) => nameRule.Id === IdKnowledge
//   );
//   // มีข้อมูล
//   if (index > -1) {
//     data[index].Conditions.push({
//       Id: Math.random(),
//       Symptom: Symptom,
//       Description: Description,
//     });
//   }
// }

// export function editRule(
//   IdKnowledge: number,
//   IdRule: number,
//   Symptom: string,
//   Description: string
// ) {
//   const knowIndex: number = data.findIndex((d) => d.Id === IdKnowledge);
//   if (knowIndex !== -1) {
//     const ruleIndex: number = data[knowIndex].Conditions.findIndex(
//       (d) => d.Id === IdRule
//     );
//     if (ruleIndex !== -1) {
//       data[knowIndex].Conditions[ruleIndex].Symptom = Symptom;
//       data[knowIndex].Conditions[ruleIndex].Description = Description;
//     }
//   }
// }
