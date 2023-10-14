window.onload = function startMain() {
  //remove the window.onload when transferring over to Builder
  console.log("Start Main: Event Card");

  templateEventCard = document.querySelectorAll("template-event-card")[0];

  if (templateEventCard) {
    let eventCard = buildBuildCard(templateEventCard);
    templateEventCard.parentNode.insertBefore(eventCard, templateEventCard.nextSibling);
    templateEventCard.remove();
  }

  var html = document.querySelectorAll("event-card")[0].innerHTML;
  document.querySelectorAll("event-card")[0].innerHTML = replaceIcon(html);
  setTimeout(() => {
    resize();
  }, 200);
};

function resize() {
  dynamicSizing(document.querySelectorAll("event-card")[0], 55);
}

function buildBuildCard(template) {
  let eventCard = document.createElement("event-card");
  template.parentNode.insertBefore(eventCard, templateEventCard.nextSibling);
  let eventName = template.getAttribute("name");
  let eventLore = template.getAttribute("lore");

  const eventHeader = document.querySelector('event-header');
  console.log('Event Header:', eventHeader);

  const subevent1 = document.querySelector('subevent-1');


  const subevent2 = document.querySelector('subevent-2');


  const tokenEvent1 = document.querySelector('token-event-1');

  const tokenEvent2 = document.querySelector('token-event-2');
  

  html = `
          <event-title>${eventName}</event-title>
          `;

  html += `
          <effect> ${eventLore} </effect>
          `;

  html += parseSubevent(subevent1);

  html += parseSubevent(subevent2);

  html+= parseTokenEvent(tokenEvent1, true);

  html+= parseTokenEvent(tokenEvent2, false);

  html+= `
          <event-card-overlay> </event-card-overlay>
         `;

  eventCard.innerHTML = html;
console.log(html);
  return eventCard;
}

function parseSubevent (el) {
  let name = el.getAttribute("name");
  let effect = el.getAttribute("effect");
  let type = el.getAttribute("type");
  let html;
  if (type == "choice"){
    html = `
    <subevent-header> ${name} </subevent-header>
    <effect> ${effect} </effect>
    `
  } else{
    console.log("health time");
    html = `
    <subevent-banner-healthy> <subevent-banner-text> Healthy Island </subevent-banner-text> </subevent-banner-healthy>
    <subevent-header> ${name} </subevent-header>
    <effect> ${effect} </effect>
    `
  }


  return html;
}


function parseTokenEvent(el, isTopEvent){
  let name = el.getAttribute("name");
  let effect = el.getAttribute("effect");
  let tokens = el.getAttribute("tokens");
  console.log(tokens);
  let bottomOffset = isTopEvent ? "160px" : "40px"; 

  let html = `

      <token-event-${tokens} style="bottom: ${bottomOffset};">

      <token-event-icon-${tokens}> </token-event-icon-${tokens}>

      <token-event-effect><span style="font-family: Name Headings; letter-spacing: 0px;">${name}</span> ${effect}</token-event-effect>
      
      </token-event-${tokens}>
      `
  ;

  return html;
}

function dynamicSizing(el, maxSize = el.offsetHeight) {
  let j = 0;
  while (checkOverflow(el)) {
    var style = window.getComputedStyle(el, null).getPropertyValue("font-size");
    var line = window.getComputedStyle(el, null).getPropertyValue("line-height");
    var fontSize = parseFloat(style);
    var lineHeight = parseFloat(line);
    el.style.lineHeight = lineHeight - 1 + "px";
    if (lineHeight < 15) {
      // there's more room in line height first
      el.style.fontSize = fontSize - 1 + "px";
    }
    // safety valve
    j += 1;
    if (j > 8) {
      console.log("safety");
      break;
    }
  }
}

function checkOverflow(el) {
  let curOverflow = el.style.overflow;
  if (!curOverflow || curOverflow === "visible") {
    el.style.overflow = "hidden";
  }
  let isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
  el.style.overflow = curOverflow;
  return isOverflowing;
}
