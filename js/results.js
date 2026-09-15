const result=JSON.parse(localStorage.getItem("prepai_result")||"null");
if(!result){location.href="generator.html"}else{
 const {settings,questions,answers}=result;
 const correct=questions.reduce((n,q,i)=>n+(answers[i]===q.a?1:0),0), score=Math.round(correct/questions.length*100);
 document.getElementById("resultTitle").textContent=`${settings.exam} • ${settings.subject} • ${settings.topic}`;
 document.getElementById("score").textContent=score+"%";document.getElementById("percent").textContent=score+"%";document.getElementById("correct").textContent=correct;document.getElementById("wrong").textContent=questions.length-correct;document.getElementById("total").textContent=questions.length;
 const history=JSON.parse(localStorage.getItem("prepai_history")||"[]");
 history.unshift({exam:settings.exam,subject:settings.subject,topic:settings.topic,questions:questions.length,score,correct,date:result.date});
 localStorage.setItem("prepai_history",JSON.stringify(history.slice(0,50)));
 document.getElementById("review").innerHTML=questions.map((q,i)=>`<div class="review-item"><b>${i+1}. ${q.q}</b><p class="${answers[i]===q.a?"correct-text":"wrong-text"}">${answers[i]===undefined?"Not answered":answers[i]===q.a?"✓ Correct":"✕ Incorrect"} · Your answer: ${answers[i]===undefined?"—":q.o[answers[i]]}</p><small>${q.e}</small></div>`).join("");
}