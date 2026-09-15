(function(){
  const theme=localStorage.getItem("prepai_theme")||"light";
  document.documentElement.dataset.theme=theme;
  const btn=document.getElementById("themeBtn");
  if(btn){btn.textContent=theme==="dark"?"☀":"☾";btn.onclick=()=>{const next=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=next;localStorage.setItem("prepai_theme",next);btn.textContent=next==="dark"?"☀":"☾";};}
})();