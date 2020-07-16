/* eslint-disable no-unused-vars */
import xlsx from "xlsx";
export function readStudentsFile(file) {
  return new Promise(resolve => {
    let students = [];
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    // 异步
    reader.onload = event => {
      let data = event.target.result;
      let workbook = xlsx.read(data, { type: "binary" });
      let sheet = workbook.Sheets[workbook.SheetNames[0]];
      xlsx.utils.sheet_to_row_object_array(sheet).forEach(r => {
        let number = parseInt(r.__EMPTY);
        if (!isNaN(number)) {
          let student = {
            user: {
              number: number,
              name: r.__EMPTY_1
            }
          };
          students.push(student);
        }
      });
    };
    // 当load结束，回调
    // 当执行resolve()方法，会激活调用处的then()方法
    reader.onloadend = () => {
      resolve(students);
    };
  });
}
export function readPaperFile(file) {
  return new Promise(resolve => {
    let choiceList = [];
    let judgmentList = [];
    let subjectiveList = [];
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    // 异步
    reader.onload = event => {
      let data = event.target.result;
      let workbook = xlsx.read(data, { type: "binary" });
      let sheet = workbook.Sheets[workbook.SheetNames[0]];
      xlsx.utils.sheet_to_row_object_array(sheet).forEach(r => {
        // console.log(r);
        let type = r.type;
        if (type == 1) {
          let choose = {
            title: r.title,
            option_A: r.option_1,
            option_B: r.option_2,
            option_C: r.option_3,
            option_D: r.option_4,
            answer: r.answer,
            score: r.score
          };
          choiceList.push(choose);
        }
        if (type == 2) {
          let judgment = {
            title: r.title,
            answer: r.answer,
            score: r.score
          };
          judgmentList.push(judgment);
        }
        if (type == 3) {
          let subjective = {
            title: r.title,
            answer: r.answer,
            score: r.score
          };
          subjectiveList.push(subjective);
        }
      });
    };
    // 当load结束，回调
    // 当执行resolve()方法，会激活调用处的then()方法
    reader.onloadend = () => {
      resolve({
        choiceList: choiceList,
        judgmentList: judgmentList,
        subjectiveList: subjectiveList
      });
    };
  });
}

class Student {
  number;
  name;
  score;
}
class Choose {
  title;
  A;
  B;
  C;
  D;
  answer;
  score;
}
class Judgment {
  title;
  answer;
  score;
}
class Subjective {
  title;
  answer;
  score;
}
