"use client";
import React, { useState } from "react";
import TabComponent from "@/components/tab";
import { tabButton } from "@/util/initial";
import PageData from "@/components/pageData";
import PageUser from "@/components/pageUser";

const PageAiDoctor = () => {
  const [tab, setTab] = useState(tabButton[0].code)
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-4" style={{ marginTop: 20 }}></div>
      <TabComponent tab={tab} setTab={setTab}>

        {
          tab === 'usage' && (
            <PageUser />
          )
        }

        {
          tab === 'data' && (
            <PageData />
          )
        }
      </TabComponent>
    </div >
  );
};

export default PageAiDoctor;