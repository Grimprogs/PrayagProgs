fetch('https://pragyaaprop.vercel.app/properties')
  .then(r => r.text())
  .then(html => {
    console.log('Properties header has sticky top-0:', html.includes('sticky top-0 z-40'));
    console.log('Properties header is relative:', html.includes('relative bg-[#faede0] border-b border-[#ecd9c6] overflow-hidden'));
  });
