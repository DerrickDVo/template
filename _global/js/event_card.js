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
  let eventType = template.getAttribute("type");

  const eventHeader = document.querySelector('event-header');
  console.log('Event Header:', eventHeader);

  const subevent1 = document.querySelector('subevent-1');

  const subevent2 = document.querySelector('subevent-2');

  const tokenEvent1 = document.querySelector('token-event-1');

  const tokenEvent2 = document.querySelector('token-event-2');
  
  console.log("HI");


  
  html = `<event-body>         
          `;

  if (eventType == "choice"){
  html += ` <subevent-header class = "title" >${eventName}</subevent-header>
            <effect class = "title"> ${eventLore} </effect>
          `;
          }



  html += parseSubevent(subevent1, true);

  html += parseSubevent(subevent2, false);

  html += `</event-body>
          `;

  html+= parseTokenEvent(tokenEvent1, true);

  html+= parseTokenEvent(tokenEvent2, false);

  html+= `
          <event-card-overlay> </event-card-overlay>
         `;

  eventCard.innerHTML = html;
console.log(html);
  return eventCard;
}

function parseSubevent (el, isTopEvent) {
  let name = el.getAttribute("name");
  let effect = el.getAttribute("effect");
  let type = el.getAttribute("type");
  let bannerText = el.getAttribute("bannerText");
  let html;

  switch (type){
    case "choice":
      html = `<subevent>
      <subevent-body class="choice">
      <subevent-header class = "choice"> ${name} </subevent-header>
      <effect> ${effect} </effect> </subevent-body>
      </subevent>
      `
    break;

    case "healthy":
      html = `<subevent>
      <subevent-banner class="${type}"> <subevent-banner-text> Healthy Island </subevent-banner-text> </subevent-banner><subevent-body>
      <subevent-header> ${name} </subevent-header>
      <effect> ${effect} </effect> </subevent-body>
      </subevent>
      `
      break;
    
      case "blighted":
      html = `<subevent>
      <subevent-banner class="${type}"> <subevent-banner-text> Blighted Island </subevent-banner-text> </subevent-banner><subevent-body>
      <subevent-header> ${name} </subevent-header>
      <effect> ${effect} </effect> </subevent-body>
      </subevent>
      `
      break;
    
      case "terror1":
        html = `<subevent>
        <subevent-banner class="${type}"> 
        <subevent-banner-icon class="terror1"> </subevent-banner-icon>
        </subevent-banner> 
        
        <subevent-body>
        <subevent-header> ${name} </subevent-header>
        <effect> ${effect} </effect> </subevent-body>
        </subevent>
        `
      break;
      
      case "terror12":
        html = `<subevent>
        <subevent-banner class="${type}"> 
        <subevent-banner-icon class="terror1"> </subevent-banner-icon>
        <subevent-banner-icon class="terror12"> </subevent-banner-icon>

        </subevent-banner><subevent-body>
        <subevent-header> ${name} </subevent-header>
        <effect> ${effect} </effect> </subevent-body>
        </subevent>
        `
      break;
      
      case "terror23":
        html = `<subevent>
        <subevent-banner class="${type}"> 
        <subevent-banner-icon class="terror23"> </subevent-banner-icon>
        <subevent-banner-icon class="terror3"> </subevent-banner-icon>

        </subevent-banner><subevent-body>
        <subevent-header> ${name} </subevent-header>
        <effect> ${effect} </effect> </subevent-body>
        </subevent>
        `
      break;
      
      case "terror3":
        html = `<subevent>
        <subevent-banner class="${type}"> 
        <subevent-banner-icon class="terror3"> </subevent-banner-icon>

        </subevent-banner><subevent-body>
        <subevent-header> ${name} </subevent-header>
        <effect> ${effect} </effect> </subevent-body>
        </subevent>
        `
      break;
      
      default:
      break;
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

      <token-event class="${tokens}" style="bottom: ${bottomOffset};">

      <token-event-icon class="${tokens}"> </token-event-icon class="${tokens}">

      <token-event-texture> </token-event-texture>


      <token-event-effect><span style="font-family: Name Headings; letter-spacing: 0px;">${name}</span> ${effect}</token-event-effect>
      
      </token-event class="${tokens}">
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
