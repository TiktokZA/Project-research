import React from "react";
import { useState } from "react";
import { UserData_AJ } from "./Graph_aj";
import "../style/Static.css";
import { NavLink } from "react-router-dom";
function StaticPersonBottom({
  typesNow,
  dataresearch,
  professorlist,
  sendTeacherIndex,
}) {
  console.log("dataresearch=>", dataresearch);
  console.log("professorlist=>", professorlist);
  let list = [];
  if (typesNow === "จำแนกทั้งหมด") {
    for (let i = 0; i < professorlist.length; i++) {
      let sum = 0;
      for (let j = 0; j < dataresearch.length; j++) {
        if (
          professorlist[i].Keyword === dataresearch[j].Keyword &&
          typesNow === "จำแนกทั้งหมด"
        )
          sum++;
      }
      list.push({
        ID: professorlist[i].ID_professor,
        name:
          professorlist[i].title_name +
          professorlist[i].firstname_professor +
          " " +
          professorlist[i].lastname_professor,
        num: sum,
      });
    }
  } else if (typesNow === "จำแนกตาม Scholar") {
    for (let i = 0; i < professorlist.length; i++) {
      let sum = 0;
      for (let j = 0; j < dataresearch.length; j++) {
        if (
          professorlist[i].Keyword === dataresearch[j].Keyword &&
          dataresearch[j].ID_Type === 1
        )
          sum++;
      }
      list.push({
        ID: professorlist[i].ID_professor,
        name:
          professorlist[i].title_name +
          professorlist[i].firstname_professor +
          " " +
          professorlist[i].lastname_professor,
        num: sum,
      });
    }
  } else if (typesNow === "จำแนกตาม Scopus") {
    for (let i = 0; i < professorlist.length; i++) {
      let sum = 0;
      for (let j = 0; j < dataresearch.length; j++) {
        if (
          professorlist[i].Keyword === dataresearch[j].Keyword &&
          dataresearch[j].ID_Type === 2
        )
          sum++;
      }
      list.push({
        ID: professorlist[i].ID_professor,
        name:
          professorlist[i].title_name +
          professorlist[i].firstname_professor +
          " " +
          professorlist[i].lastname_professor,
        num: sum,
      });
    }
  }

  const dataShow = list.sort(function (a, b) {
    return b.num - a.num;
  });
  return (
    <div class="bg-[#F0F8FF] pt-[30px]">
      <div class="grid place-items-center w-full min-h-[70px]">
        <div class="grid h-auto w-[90%]">
          <div class="text-white font-bold1 text-[17px] h-[45px] w-full bg-regal-red rounded-[5px] grid grid-cols-10">
            <div class="col-span-1  grid place-items-center">
              <div>ลำดับที่</div>
            </div>
            <div class="grid place-items-center col-span-5 ">
              <div>รายชื่อเจ้าของผลงานทั้งหมด</div>
            </div>
            <div class="grid place-items-center col-span-2 ">
              <div>จำนวนผลงาน</div>
            </div>
            <div class="grid place-items-center col-span-2">
              <div></div>
            </div>
          </div>
        </div>
        {dataShow.map((item, index) => (
          <div class="grid h-auto w-[90%] py-[10px] bg-white shadow-sm">
            <div class="font-bold1 h-[40px] w-full  grid grid-cols-10">
              <div class="col-span-1  grid place-items-center">
                <div>{index + 1}</div>
              </div>
              <div class="grid place-items-center col-span-5 ">
                <div>{item.name}</div>
              </div>
              <div class="grid place-items-center col-span-2">
                <div>{item.num}</div>
              </div>
              <div class="grid place-items-center col-span-2">
                <NavLink
                  onClick={() => sendTeacherIndex(item.ID)}
                  to={`../id=${item.ID}`}
                >
                  <div>แสดงโปรไฟล์</div>
                </NavLink>
              </div>
            </div>
          </div>
        ))}
        <div class="w-full h-[30px]"></div>
      </div>
    </div>
  );
}

export default StaticPersonBottom;
