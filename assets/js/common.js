// GitGloss — Cotton Candy Glass
// Common navigation & scroll observer

function go(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.querySelectorAll('.nb').forEach(b => b.classList.remove('on'));
  const map = ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13','s14'];
  const i = map.indexOf(id);
  if (i >= 0) document.querySelectorAll('.nb')[i]?.classList.add('on');
}

const obs = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting && e.intersectionRatio > .45) {
      const map = ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13','s14'];
      const i = map.indexOf(e.target.id);
      if (i >= 0) {
        document.querySelectorAll('.nb').forEach(b => b.classList.remove('on'));
        document.querySelectorAll('.nb')[i]?.classList.add('on');
      }
    }
  });
}, { threshold: .45 });

document.querySelectorAll('.slide').forEach(s => obs.observe(s));
