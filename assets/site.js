(()=>{
  'use strict';
  const featureContent={
    face:{glyph:'( · · )',title:'From cheekbones to chin.',text:'Refine the face outline, jaw corners, and chin with grouped points. Face width and head width have separate controls.',tip:'Select a point in the list to turn the model toward it.'},
    detail:{glyph:'{ : : }',title:'A closer look at the details.',text:'Shape eyelids, brow ends, the nose bridge, and lips with smaller control regions. Keep neighboring features visible as you make fine changes.',tip:'Use the arrow keys for smaller changes to a selected point.'},
    head:{glyph:'[ @ @ ]',title:'A head from every angle.',text:'Inspect the crown, temples, ears, and back of the head. Extra profile and rear photos help the fit describe areas that the front view cannot show.',tip:'Dashed controls sit under hair. Their group stays separate from facial features.'},
    neck:{glyph:' / | \\ ',title:'Let the portrait meet its base.',text:'Refine the jaw-to-neck transition, nape, and shoulders. Check the silhouette in profile and from the back before you save the model.',tip:'Switch camera views without losing your current adjustments.'}
  };
  const tabs=[...document.querySelectorAll('[data-feature]')],panel=document.getElementById('feature-panel');
  const chooseFeature=(id,updateUrl=true)=>{
    const content=featureContent[id];if(!content||!panel)return;
    for(const tab of tabs){const selected=tab.dataset.feature===id;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;}
    panel.setAttribute('aria-labelledby','tab-'+id);
    panel.querySelector('.feature-glyph').textContent=content.glyph;panel.querySelector('h3').textContent=content.title;
    panel.querySelector('p:not(.feature-tip)').textContent=content.text;panel.querySelector('.feature-tip').textContent=content.tip;
    if(updateUrl){try{const url=new URL(location.href);url.searchParams.set('tools',id);history.replaceState(null,'',url)}catch{}}
  };
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>chooseFeature(tab.dataset.feature));
    tab.addEventListener('keydown',event=>{
      let next;if(event.key==='ArrowRight')next=(i+1)%tabs.length;if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;
      if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;
      if(next!==undefined){event.preventDefault();tabs[next].focus();chooseFeature(tabs[next].dataset.feature)}
    });
  });
  chooseFeature(new URL(location.href).searchParams.get('tools')||'face',false);
  const portrait=document.getElementById('heroPortrait');let scene;
  if(portrait&&window.AsciiFaceDemo){
    scene=AsciiFaceDemo.mount(portrait,{yaw:-35*Math.PI/180,zoom:1.14,onChange:angles=>{
      document.querySelectorAll('[data-demo-view]').forEach(button=>button.setAttribute('aria-pressed',String(Math.abs(angles.yaw-Number(button.dataset.demoView)*Math.PI/180)<.035&&Math.abs(angles.pitch)<.03)));
    }});
    document.querySelectorAll('[data-demo-view]').forEach(button=>button.addEventListener('click',()=>scene.setView(Number(button.dataset.demoView)*Math.PI/180)));
    document.querySelectorAll('[data-demo-zoom]').forEach(button=>button.addEventListener('click',()=>scene.zoomBy(button.dataset.demoZoom==='in'?1.12:1/1.12)));
  }else if(portrait){portrait.querySelector('pre').textContent='The reference preview could not load. Open the studio to continue.'}
  const status=document.getElementById('exportStatus');
  document.getElementById('sampleTxt')?.addEventListener('click',()=>{
    if(!window.AsciiFaceDemo){status.textContent='Reload the page to load the reference model, then try again.';return}
    AsciiFaceDemo.downloadText(scene?.getAngles());status.textContent='Sample text exported.';
  });
  document.getElementById('sampleHtml')?.addEventListener('click',()=>{
    if(!window.AsciiFaceDemo){status.textContent='Reload the page to load the reference model, then try again.';return}
    AsciiFaceDemo.downloadHTML(scene?.getAngles());status.textContent='Sample HTML exported. Open portrait.html to rotate the model.';
  });
  document.getElementById('copyEmbed')?.addEventListener('click',async event=>{
    const code=document.getElementById('embedCode'),button=event.currentTarget;
    try{await navigator.clipboard.writeText(code.textContent);button.textContent='Copied';status.textContent='Embed code copied.';setTimeout(()=>button.textContent='Copy',2500)}
    catch{const range=document.createRange();range.selectNodeContents(code);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);code.parentElement.focus();status.textContent='Code selected. Press Ctrl+C or Command+C to copy.'}
  });
  const studies=[...document.querySelectorAll('.angle-study')];
  if(studies.length&&window.AsciiFaceDemo){
    const renderStudy=element=>{
      const pre=element.querySelector('pre'),cols=62,rows=58;pre.style.fontSize=Math.min((element.clientWidth-8)/(cols*.61),145/rows)+'px';
      pre.textContent=AsciiFaceDemo.frame({yaw:Number(element.dataset.angle)*Math.PI/180,pitch:0,zoom:.99},{cols,rows});
    };
    const ready=document.fonts?.ready||Promise.resolve();ready.then(()=>{
      if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){renderStudy(entry.target);observer.unobserve(entry.target)}},{rootMargin:'200px'});studies.forEach(el=>observer.observe(el))}
      else studies.forEach(renderStudy);
    });
  }
  const toc=[...document.querySelectorAll('.guide-toc a')];
  if(toc.length&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)toc.forEach(link=>link.setAttribute('aria-current',String(link.hash==='#'+entry.target.id)))},{rootMargin:'-15% 0px -60% 0px'});document.querySelectorAll('.guide-article section[id]').forEach(section=>observer.observe(section))}
})();
