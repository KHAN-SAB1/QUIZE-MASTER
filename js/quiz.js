const demo=[
 {q:"Which organelle is known as the powerhouse of the cell?",o:["Nucleus","Mitochondrion","Ribosome","Golgi apparatus"],a:1,e:"Mitochondria produce most cellular ATP through respiration."},
 {q:"Which molecule carries genetic information in most organisms?",o:["DNA","ATP","Glucose","Lipid"],a:0,e:"DNA stores hereditary genetic information."},
 {q:"What is the SI unit of force?",o:["Joule","Newton","Watt","Pascal"],a:1,e:"Force is measured in newtons."},
 {q:"What is 12 × 8?",o:["86","96","108","88"],a:1,e:"12 multiplied by 8 equals 96."},
 {q:"Choose the closest meaning of 'rapid'.",o:["Slow","Quick","Weak","Late"],a:1,e:"Rapid means happening quickly."}
];
const settings=JSON.parse(localStorage.getItem("prepai_quiz_settings")||'{"exam":"MDCAT","subject":"Biology","topic":"Cell Biology","difficulty":"Medium","count":5,"timer":0}');
const questions=Array.from({length:settings.count},(_,i)=>({...demo[i%demo.length],id:i+1}));
let index=0,answers={},seconds=settings.timer*60,timerStarted=false;
document.getElementById("quizExam").textContent=settings.exam;
document.getElementById("quizTopic").textContent=settings.topic;
document.getElementById("difficultyLabel").textContent=settings.difficulty;
document.getElementById("questionNumbers").innerHTML=questions.map((_,i)=>`<button class="question-number" data-i="${i}">${i+1}</button>`).join("");
document.querySelectorAll(".question-number").forEach(b=>b.onclick=()=>{index=Number(b.dataset.i);render()});
function render(){
 const q=questions[index];
 document.getElementById("questionCount").textContent=`${index+1} of ${questions.length}`;
 document.getElementById("questionText").textContent=q.q;
 document.getElementById("options").innerHTML=q.o.map((x,i)=>`<button class="option ${answers[index]===i?"selected":""}" data-i="${i}"><span>${String.fromCharCode(65+i)}</span>${x}</button>`).join("");
 document.querySelectorAll(".option").forEach(b=>b.onclick=()=>{answers[index]=Number(b.dataset.i);render()});
 document.querySelectorAll(".question-number").forEach((b,i)=>b.className=`question-number ${i===index?"current":""} ${answers[i]!==undefined?"answered":""}`);
 document.getElementById("progress").style.width=((index+1)/questions.length*100)+"%";
 document.getElementById("prevBtn").disabled=index===0;
 document.getElementById("nextBtn").textContent=index===questions.length-1?"Submit Quiz ✓":"Next →";
}
document.getElementById("prevBtn").onclick=()=>{if(index>0){index--;render()}};
document.getElementById("nextBtn").onclick=()=>{if(index<questions.length-1){index++;render()}else finish()};
function finish(){localStorage.setItem("prepai_result",JSON.stringify({settings,questions,answers,date:new Date().toISOString()}));location.href="results.html";}
if(seconds>0){timerStarted=true;const t=setInterval(()=>{seconds--;const m=String(Math.floor(seconds/60)).padStart(2,"0"),s=String(seconds%60).padStart(2,"0");document.getElementById("timer").textContent=`${m}:${s}`;if(seconds<=0){clearInterval(t);finish()}},1000)}else document.getElementById("timer").textContent="No timer";
render();