(function(){
  const cfg=window.MOMS_FORET_CONFIG||{};
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  // Replace photo placeholders automatically when a matching local image file is added.
  $$('[data-photo]').forEach(slot=>{
    const src=slot.getAttribute('data-photo');
    if(!src)return;
    const img=new Image();
    img.onload=()=>{slot.classList.add('has-photo');img.alt=slot.getAttribute('data-alt')||'맘스포레 시설 사진';slot.appendChild(img);};
    img.onerror=()=>{};
    img.src=src;
  });
  const menu=$('.menu-toggle'),nav=$('.main-nav');
  if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');});nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');}});}
  // Common phone, address, hours and channel fields.
  $$('[data-phone-text]').forEach(el=>el.textContent=cfg.phoneDisplay||'전화번호를 입력해 주세요');
  $$('[data-address-text]').forEach(el=>el.textContent=cfg.address||'주소를 입력해 주세요');
  $$('[data-hours-text]').forEach(el=>el.textContent=cfg.hours||'운영시간을 입력해 주세요');
  $$('[data-phone-link]').forEach(el=>{if(cfg.phoneLink){el.href='tel:'+String(cfg.phoneLink).replace(/[^0-9+]/g,'');el.classList.remove('is-placeholder');}else{el.href='reservation.html';el.setAttribute('aria-label','전화번호 설정 후 연결됩니다. 상담 예약 페이지로 이동');}});
  $$('[data-kakao-link]').forEach(el=>{if(cfg.kakaoUrl){el.href=cfg.kakaoUrl;el.target='_blank';el.rel='noopener noreferrer';el.classList.remove('is-placeholder');}else{el.href='reservation.html';el.setAttribute('aria-label','카카오톡 상담 주소 설정 후 연결됩니다. 상담 예약 페이지로 이동');}});
  $$('[data-current-year]').forEach(el=>el.textContent=new Date().getFullYear());
  // Canonical and Open Graph URL adapt to GitHub Pages project URLs.
  const page=(location.pathname.split('/').pop()||'index.html');
  let base=cfg.siteUrl?cfg.siteUrl.replace(/\/$/,''):location.origin+location.pathname.substring(0,location.pathname.lastIndexOf('/'));
  const canonicalUrl=base+(page==='index.html'||page===''?'/':'/'+page);
  const canonical=$('link[rel="canonical"]');if(canonical)canonical.href=canonicalUrl;
  const og=$('meta[property="og:url"]');if(og)og.content=canonicalUrl;
  if(page==='index.html'||page===''||page==='preview.html'){
    let schemaEl=$('script[data-dynamic-website-schema]');
    if(!schemaEl){schemaEl=document.createElement('script');schemaEl.type='application/ld+json';schemaEl.setAttribute('data-dynamic-website-schema','');document.head.appendChild(schemaEl);}
    schemaEl.textContent=JSON.stringify({'@context':'https://schema.org','@type':'WebSite','name':cfg.siteName||'맘스포레 산후조리원','url':canonicalUrl,'inLanguage':'ko-KR'});
    // Only publish LocalBusiness details after the operator replaces the template fields with verified real information.
    const hasRealContact=(cfg.phoneLink&&cfg.phoneDisplay&&!/입력해 주세요/.test(cfg.phoneDisplay));
    const hasRealAddress=(cfg.streetAddress||cfg.addressLocality||cfg.addressRegion||(cfg.address&&!/입력해 주세요/.test(cfg.address)));
    if(hasRealContact||hasRealAddress){
      let business=$('script[data-dynamic-business-schema]');
      if(!business){business=document.createElement('script');business.type='application/ld+json';business.setAttribute('data-dynamic-business-schema','');document.head.appendChild(business);}
      const item={'@context':'https://schema.org','@type':'LocalBusiness','@id':base+'/#business','name':cfg.siteName||'맘스포레 산후조리원','url':canonicalUrl};
      if(hasRealContact)item.telephone=cfg.phoneDisplay;
      if(cfg.streetAddress||cfg.addressLocality||cfg.addressRegion){item.address={'@type':'PostalAddress','addressCountry':cfg.addressCountry||'KR'};if(cfg.streetAddress)item.address.streetAddress=cfg.streetAddress;if(cfg.addressLocality)item.address.addressLocality=cfg.addressLocality;if(cfg.addressRegion)item.address.addressRegion=cfg.addressRegion;if(cfg.postalCode)item.address.postalCode=cfg.postalCode;}
      else if(hasRealAddress)item.address=cfg.address;
      business.textContent=JSON.stringify(item);
    }
  }
  const year=$('[data-current-year]');if(year)year.textContent=new Date().getFullYear();
  // Reservation form works only after an endpoint is deliberately configured.
  const form=$('#reservation-form'),message=$('#form-message');
  if(form){form.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    if(!cfg.formEndpoint){message.textContent='아직 예약 접수 시스템이 연결되지 않았습니다. assets/js/site-config.js 파일의 formEndpoint에 Formspree 등 폼 수신 URL을 설정한 후 공개해 주세요. 현재 입력 내용은 전송되지 않았습니다.';message.classList.add('show');return;}
    const submit=$('button[type="submit"]',form);const original=submit.textContent;submit.disabled=true;submit.textContent='전송 중…';
    try{const res=await fetch(cfg.formEndpoint,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}});if(!res.ok)throw new Error('Submission failed');form.reset();message.textContent='상담 신청이 접수되었습니다. 담당자가 확인 후 연락드릴 예정입니다.';message.classList.add('show');}
    catch(err){message.textContent='전송에 실패했습니다. 잠시 후 다시 시도하거나 전화로 문의해 주세요.';message.classList.add('show');}
    finally{submit.disabled=false;submit.textContent=original;}
  });}
  // FAQ schema is authored in the visible page. This script does not invent medical facts.
})();
