const form=document.getElementById("generatorForm");
const subjects={
  IELTS:["Reading","Listening","Writing","Speaking","Grammar","Vocabulary"],
  MDCAT:["Biology","Chemistry","Physics","English"],
  ECAT:["Mathematics","Physics","Chemistry","English"],
  KMU:["Biology","Chemistry","Physics","English"],
  ISSB:["Verbal Intelligence","Non-Verbal Intelligence","Analytical Reasoning","General Knowledge","Personality Practice"],
  Custom:["General"]
};
const exam=document.getElementById("exam"), subject=document.getElementById("subject");
function refreshSubjects(){subject.innerHTML=subjects[exam.value].map(x=>`<option>${x}</option>`).join("");}
exam.addEventListener("change",refreshSubjects);
refreshSubjects();
form.addEventListener("submit",e=>{
 e.preventDefault();
 const data={exam:exam.value,subject:subject.value,topic:document.getElementById("topic").value,difficulty:document.getElementById("difficulty").value,count:Number(document.getElementById("count").value),timer:Number(document.getElementById("timer").value)};
 localStorage.setItem("prepai_quiz_settings",JSON.stringify(data));
 document.getElementById("generatorMessage").textContent="Quiz settings saved. Demo questions will open now. Later we will connect this button to your AI + Supabase.";
 setTimeout(()=>location.href="quiz.html",500);
});