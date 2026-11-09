(()=>{
  'use strict';
  const preview=document.getElementById('stage');
  angles.zoom??=1;
  document.getElementById('zoomIn').addEventListener('click',()=>{angles.zoom=Math.min(2.6,angles.zoom*1.12);render()});
  document.getElementById('zoomOut').addEventListener('click',()=>{angles.zoom=Math.max(.45,angles.zoom/1.12);render()});
  preview.addEventListener('keydown',event=>{
    if(event.target!==preview)return;
    const move=.10;
    if(event.key==='ArrowLeft')angles.yaw-=move;else if(event.key==='ArrowRight')angles.yaw+=move;
    else if(event.key==='ArrowUp')angles.pitch=Math.min(1.3,angles.pitch+move);else if(event.key==='ArrowDown')angles.pitch=Math.max(-1.3,angles.pitch-move);
    else if(event.key==='+'||event.key==='=')angles.zoom=Math.min(2.6,angles.zoom*1.08);
    else if(event.key==='-')angles.zoom=Math.max(.45,angles.zoom/1.08);else return;
    event.preventDefault();event.stopPropagation();render();
  });
  const help=document.getElementById('shortcutsDialog');document.getElementById('shortcuts').addEventListener('click',()=>help.showModal());
  for(const input of photoInputs){
    input.canvas.tabIndex=0;input.canvas.setAttribute('role','group');
    const caption=input.caption.textContent;
    const updateFrameLabel=()=>input.canvas.setAttribute('aria-label',caption+(input.image?'. Uploaded photo. Use arrow keys to pan and plus or minus to zoom.':'. Reference example. Upload a photo matching this angle.'));
    new MutationObserver(updateFrameLabel).observe(input.canvas,{attributes:true,attributeFilter:['data-empty']});
    updateFrameLabel();
    input.remove.setAttribute('aria-label','Remove photo: '+caption);
    input.canvas.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-'].includes(event.key))return;
      event.preventDefault();event.stopPropagation();if(!input.image||busy)return;
      if(event.key==='ArrowLeft')input.frame.x-=8;if(event.key==='ArrowRight')input.frame.x+=8;
      if(event.key==='ArrowUp')input.frame.y-=8;if(event.key==='ArrowDown')input.frame.y+=8;
      if(event.key==='+'||event.key==='=')input.frame.zoom=Math.min(6,input.frame.zoom*1.08);
      if(event.key==='-')input.frame.zoom=Math.max(.20,input.frame.zoom/1.08);
      invalidateDetection();
    });
  }
  let changed=false;const originalRemember=remember;remember=function(){changed=true;return originalRemember()};
  addEventListener('beforeunload',event=>{if(changed){event.preventDefault();event.returnValue=''}});
  document.fonts?.ready.then(()=>{
    render();
    if(photoDialog.open)photoInputs.filter(input=>!input.image).forEach(input=>drawFramedPhoto(input));
  });
})();
