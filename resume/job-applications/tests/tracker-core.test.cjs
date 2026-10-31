"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../../../dist/applications/core.js");

const fixture = () => ({
  schemaVersion:1,
  jobs:[
    {id:"first",institution:"University A",title:"Lecturer",postingUrl:"https://www.higheredjobs.com/details.cfm?JobCode=123&Title=Lecturer",priority:"high",status:"preparing"},
    {id:"second",institution:"University B",title:"Researcher",postingUrl:"https://jobs.example.edu/posting/9",priority:"medium",status:"submitted"}
  ]
});

test("canonical job codes reject repeat HigherEdJobs links with a different title",()=>{
  assert.equal(C.jobKey("https://www.higheredjobs.com/details.cfm?Title=Prof&JobCode=123"),
    C.jobKey("https://www.higheredjobs.com/details.cfm?JobCode=123&Title=Lecturer"));
  assert.equal(C.samePosting("https://jobs.example.edu/posting/9?utm_source=email",
    "https://jobs.example.edu/posting/9"),true);
  assert.equal(C.cleanUrl("javascript:alert(1)"),"");
});

test("add one URL immediately then stop duplicate additions",()=>{
  const first={id:"third",institution:"Not researched",title:"Posting to research",
    postingUrl:"https://jobs.example.edu/posting/10",status:"saved",priority:"high"};
  const added=C.applyOperations(fixture(),[{type:"add",job:first}]);
  assert.equal(added.jobs.length,3);
  const double=C.applyOperations(added,[{type:"add",job:{...first,id:"other"}}]);
  assert.equal(double.jobs.length,3);
  assert.equal(fixture().jobs.length,2,"original source remains unmodified");
});

test("submitted update removes a job from pending and preserves other jobs",()=>{
  const out=C.applyOperations(fixture(),[{type:"update",jobId:"first",
    patch:{status:"submitted",submittedAt:"2026-10-31",targetApplyBy:null}}]);
  assert.equal(out.jobs[0].status,"submitted");
  assert.equal(out.jobs[0].submittedAt,"2026-10-31");
  assert.equal(C.pending(out.jobs[0]),false);
  assert.equal(C.submitted(out.jobs[0]),true);
  assert.equal(out.jobs[1].status,"submitted");
});

test("close and reopen are distinct from submitted and sort ranks first",()=>{
  const jobs=[
    {id:"1",institution:"Alpha",status:"saved",priority:"low",rank:1},
    {id:"2",institution:"Beta",status:"ready",priority:"high",rank:null},
    {id:"3",institution:"Gamma",status:"closed",priority:"high"}
  ];
  assert.deepEqual(jobs.sort(C.prioritySort).map(j=>j.id),["1","2","3"]);
  assert.equal(C.done(jobs[2]),true);
  assert.equal(C.submitted(jobs[2]),false);
});
