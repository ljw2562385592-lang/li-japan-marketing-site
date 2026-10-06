"use strict";
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
menuButton.hidden = false;
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
  closeMenu();
  if (wasOpen) {
    const section = document.querySelector(link.getAttribute('href'));
    section.setAttribute('tabindex', '-1');
    section.focus({preventScroll: true});
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menuButton.focus();
  }
});
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const fallback = document.querySelector('#draft-fallback');
const draft = document.querySelector('#draft-text');
const openDraft = document.querySelector('#open-draft');
const email = (window.RIKOMOKO_SITE_CONFIG?.contactEmail || '').trim();
const recipient = /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email) ? email : '';
document.querySelector('#email-notice').textContent = recipient
  ? `メールの宛先：${recipient}`
  : '現在、問い合わせ先は未掲載です。草稿の宛先は空欄になります。確認済みの連絡先をご利用ください。';
if (recipient) {
  const direct = document.querySelector('#direct-email');
  direct.href = `mailto:${recipient}`;
  direct.hidden = false;
}
function invalidateDraft() {
  if (fallback.hidden) return;
  fallback.hidden = true;
  openDraft.removeAttribute('href');
  draft.value = '';
  status.textContent = '入力内容が変更されました。最新の内容で草稿を作成し直してください。';
}
form.addEventListener('input', invalidateDraft);
form.addEventListener('change', invalidateDraft);
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#contact-service').value = link.dataset.service;
  invalidateDraft();
}));
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name')).trim();
  const message = String(data.get('message')).trim();
  if (!name || !message) {
    status.textContent = 'お名前とメッセージに、空白以外の文字を入力してください。';
    form.elements.namedItem(!name ? 'name' : 'message').focus();
    return;
  }
  const subject = `【店舗集客・SNSのご相談】${data.get('service')}`;
  const body = `RIKOMOKO ご担当者様\n\n以下の内容について相談を希望します。\n\nお名前：${name}\n店舗名・会社名：${String(data.get('business')).trim() || '未記入'}\nメールアドレス：${data.get('email')}\nご相談内容：${data.get('service')}\n\n${message}\n`;
  draft.value = `宛先：${recipient || '確認済みのメールアドレスを入力してください'}\n件名：${subject}\n\n${body}`;
  openDraft.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  fallback.hidden = false;
  status.textContent = '草稿を作成しました。まだ送信されていません。内容を確認し、メールアプリで送信してください。';
  draft.focus({preventScroll:true});
  fallback.scrollIntoView({block:'nearest'});
});
form.querySelector('[type="submit"]').disabled = false;
document.querySelector('#copy-draft').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(draft.value);
    status.textContent = '草稿をコピーしました。メールアプリに貼り付けてご利用ください。';
  } catch {
    draft.focus(); draft.select();
    status.textContent = '草稿を選択しました。コピーしてご利用ください。';
  }
});
const privacy = document.querySelector('#privacy-dialog');
const privacyOpen = document.querySelector('#privacy-open');
privacyOpen.hidden = false;
privacyOpen.addEventListener('click', () => privacy.showModal());
document.querySelector('#privacy-close').addEventListener('click', () => privacy.close());
privacy.addEventListener('click', event => {
  if (event.target !== privacy) return;
  const box = privacy.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) privacy.close();
});
document.querySelector('#year').textContent = new Date().getFullYear();
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const motionControl = document.querySelector('.motion-control');
let userPaused = false;
function syncMotion() {
  const paused = userPaused || motionPreference.matches;
  document.documentElement.dataset.motion = paused ? 'paused' : 'playing';
  motionControl.setAttribute('aria-pressed', String(paused));
  motionControl.disabled = motionPreference.matches;
  motionControl.textContent = motionPreference.matches ? '静止表示（端末設定）' : paused ? '動きを再開する ▷' : '動きを止める Ⅱ';
}
motionControl.hidden = false;
motionControl.addEventListener('click', () => { userPaused = !userPaused; syncMotion(); });
motionPreference.addEventListener('change', syncMotion);
syncMotion();
if ('IntersectionObserver' in window) {
  const artObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    entry.target.dataset.motionVisible = String(entry.isIntersecting);
  }));
  document.querySelectorAll('.capability-art').forEach(art => artObserver.observe(art));
  const mobile = document.querySelector('.mobile-contact');
  let heroVisible = true;
  let contactVisible = false;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target.classList.contains('hero')) heroVisible = entry.isIntersecting;
      else contactVisible = entry.isIntersecting;
    });
    mobile.hidden = heroVisible || contactVisible;
  });
  observer.observe(document.querySelector('.hero'));
  observer.observe(document.querySelector('#contact'));
}

// Content stays visible without JavaScript; only off-screen sections reveal.
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => {
    if (element.getBoundingClientRect().top > innerHeight && !motionPreference.matches) {
      element.classList.add('is-pending');
      revealObserver.observe(element);
    }
  });
  const ticker = document.querySelector('.ticker');
  new IntersectionObserver(entries => {
    ticker.dataset.motionVisible = String(entries[0].isIntersecting);
  }).observe(ticker);
}
// One requestAnimationFrame at most per scroll event. Desktop only.
const demoImage = document.querySelector('.demo-visual');
const wideScreen = matchMedia('(min-width: 801px)');
let scrollPending = false;
function updateScrollArt() {
  scrollPending = false;
  if (userPaused || motionPreference.matches || !wideScreen.matches) {
    demoImage.style.removeProperty('--image-scale');
    return;
  }
  const box = demoImage.getBoundingClientRect();
  if (box.bottom < 0 || box.top > innerHeight) return;
  const progress = Math.max(0, Math.min(1, (innerHeight - box.top) / (innerHeight + box.height)));
  demoImage.style.setProperty('--image-scale', String(1.035 - progress * 0.035));
}
addEventListener('scroll', () => {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScrollArt); }
}, { passive: true });
wideScreen.addEventListener('change', updateScrollArt);
motionPreference.addEventListener('change', updateScrollArt);
