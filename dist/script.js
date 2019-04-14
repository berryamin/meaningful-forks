!async function(){function e(e){const t="f9765ac063fb541c632e7baec5bc91f0db0738dc";return e.indexOf("?")<0?`${e}?access_token=${t}`:`${e}&access_token=${t}`}const t=document.querySelector("#network"),r=t.querySelector("span.current-repository").lastElementChild.getAttribute("href").substring(1);console.log("TCL: currentRepoUrl",r);const o=r.substring(0,r.lastIndexOf("/")),n=e(`https://api.github.com/repos/${r}/forks?sort=stargazers`);console.log("TCL: forkApiUrl",n);let a=await fetch(n);const s=await a.json();s.forEach(e=>{console.log(e.full_name+", ")}),console.log("TCL: forks.length: "+s.length);const i=[];var c,l,d,u;async function h(e,t){let r,o=await fetch(e);if(!o.ok)throw new Error("Network response is not OK!");if(r=await o.json(),"string"==typeof t)return n(r,t);if(Array.isArray(t))return t.map(e=>n(r,e));function n(e,t){if(t.indexOf(".")>=0){let r=e;return t.split(".").forEach(e=>{r=r[e]}),r}return e[t]}}async function p(t){return h(e(`https://api.github.com/repos/${t}`),"default_branch")}function f(e){const t="http://www.w3.org/2000/svg";var r=document.createElementNS(t,"svg");r.setAttribute("height",12),r.setAttribute("width",10.5),r.setAttribute("viewBox","0 0 14 16"),r.style["vertical-align"]="middle",r.style.fill="currentColor",r.style.position="relative",r.style.bottom="1px",r.classList.add("opticon","opticon-"+e);var o=document.createElementNS(t,"title"),n=document.createElementNS(t,"path");switch(e){case"star":o.appendChild(document.createTextNode("Number of real stars (excluding author's star)")),n.setAttribute("d","M14 6l-4.9-0.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14l4.33-2.33 4.33 2.33L10.4 9.26 14 6z"),n.setAttribute("fill","black");break;case"up":o.appendChild(document.createTextNode("Number of commits ahead")),n.setAttribute("d","M5 3L0 9h3v4h4V9h3L5 3z"),n.setAttribute("fill","#84ed47"),r.setAttribute("viewBox","0 0 10 16"),r.setAttribute("height",16);break;case"flame":o.appendChild(document.createTextNode("Fork may be more recent than upstream.")),n.setAttribute("d","M5.05 0.31c0.81 2.17 0.41 3.38-0.52 4.31-0.98 1.05-2.55 1.83-3.63 3.36-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-0.3-6.61-0.61 2.03 0.53 3.33 1.94 2.86 1.39-0.47 2.3 0.53 2.27 1.67-0.02 0.78-0.31 1.44-1.13 1.81 3.42-0.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52 0.13-2.03 1.13-1.89 2.75 0.09 1.08-1.02 1.8-1.86 1.33-0.67-0.41-0.66-1.19-0.06-1.78 1.25-1.23 1.75-4.09-1.88-6.22l-0.02-0.02z"),n.setAttribute("fill","#d26911")}return n.appendChild(o),r.appendChild(n),r}s.forEach((t,r,o)=>{const n=t.owner.login;console.log("TCL: authorName",n);const a=e(t.stargazers_url);i.push(fetch(a).then(e=>{if(e.ok)return e.json();throw new Error("Network response is not OK!")}).then(e=>{e.forEach(e=>{e.login===n&&o[r].stargazers_count>0&&(console.log(`TCL: starCount of ${n} before: ${o[r].stargazers_count}`),o[r].stargazers_count--,console.log(`TCL: starCount of ${n} after: ${o[r].stargazers_count}`))})}).catch(function(e){console.log("There has been a problem with your fetch operation: ",e.message)}))}),await Promise.all(i),s.sort((c="stargazers_count",l=!0,d=parseInt,u=d?function(e){return d(e[c])}:function(e){return e[c]},l=l?-1:1,function(e,t){return e=u(e),t=u(t),l*((e>t)-(t>e))})),console.log("End of modifying stargazer count!"),await async function(e,t){const r=[];for(let o=0;o<e.length;o++)r.push(t(e[o],o,e));return Promise.all(r)}(s,async(t,n,a)=>{try{const s=t.owner.login,i=t.full_name;let c=await p(r),l=await p(i);const d=e(`https://api.github.com/repos/${i}/compare/${o}:${c}...${s}:${l}`);let[u,f]=await h(d,["ahead_by","behind_by"]);a[n].ahead_by=u,a[n].behind_by=f}catch(e){console.log(e)}}),console.log("TCL: forks",s),s.sort(function(){var e=[].slice.call(arguments),t=e.length;return function(r,o){var n,a,s,i,c,l,d;for(d=0;d<t&&(l=0,s=e[d],i="string"==typeof s?s:s.name,n=r[i],a=o[i],void 0!==s.primer&&(n=s.primer(n),a=s.primer(a)),c=s.highToLow?-1:1,n<a&&(l=-1*c),n>a&&(l=1*c),0===l);d++);return l}}({name:"stargazers_count",primer:parseInt,highToLow:!0},{name:"ahead_by",primer:parseInt,highToLow:!0},{name:"behind_by",primer:parseInt,highToLow:!1})),console.log("Beginning of DOM operations!"),s.reverse().forEach(e=>{const r=e.full_name,o=e.stargazers_count;let n=!1;if(t.querySelectorAll("div.repo").forEach(e=>{const t=e.lastElementChild.getAttribute("href");if(t){t.substring(1)===r&&(n=!0,a(e))}}),!n){const t=document.createElement("div");t.classList.add("repo");const o=document.createElement("img");o.alt="",o.classList.add("network-tree"),o.src="https://github.githubassets.com/images/modules/network/t.png";const n=e.owner.type.toLowerCase(),s=document.createElement("a");s.setAttribute("data-hovercard-type",n);const i=e.owner.login;if("user"===n){const t=e.owner.id;s.setAttribute("data-hovercard-url",`/hovercards?user_id=${t}`)}else"organization"===n&&(s.setAttribute("data-hovercard-url",`/orgs/${i}/hovercard`),s.setAttribute("href",`/${i}`));s.setAttribute("href",`/${i}`),s.setAttribute("data-octo-click","hovercard-link-click"),s.setAttribute("data-octo-dimensions","link_type:self");const c=s.cloneNode(!0);c.style.paddingLeft="4px",c.style.paddingRight="4px",s.innerText=i,c.classList.add("d-inline-block");const l=document.createElement("img");l.classList.add("gravatar");const d=e.owner.avatar_url;l.src=d,l.width="16",l.height="16",l.alt=`@${i}`,c.appendChild(l);const u=document.createElement("a");u.style.paddingRight="4px",u.setAttribute("href",`/${r}`),u.innerText=e.name,t.appendChild(o),t.appendChild(c),t.appendChild(s),t.appendChild(document.createTextNode(" / ")),t.appendChild(u),a(t)}function a(r){const n=document.createDocumentFragment();if(n.appendChild(f("star")),n.appendChild(document.createTextNode(o+" ")),e.ahead_by>0){const t=f("up");n.appendChild(t),n.appendChild(document.createTextNode(e.ahead_by+" "))}e.ahead_by-e.behind_by>0&&n.appendChild(f("flame")),r.appendChild(n),t.firstElementChild.insertAdjacentElement("afterend",r)}console.log("TCL: starCount",e.stargazers_count)})}();