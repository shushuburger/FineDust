// 여기서 작업하세요!! (경민, 여민)
// 주석 삭제하지 말 것! github에서 편집할 때 기준점 삼을 거임


  const container = document.querySelector('.cards-container');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  function updateSlidePosition() {
    container.style.transition = 'none';
    container.style.transform = `translateX(-${(cards[0].offsetWidth + 16)}px)`;
  }

  // 초기 카드 복제: 앞뒤에 하나씩 붙이기
  const cards = Array.from(container.children);
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);

  container.appendChild(firstClone);
  container.insertBefore(lastClone, cards[0]);

  let currentIndex = 1;
  const cardWidth = cards[0].offsetWidth + 16;

  container.style.transform = `translateX(-${cardWidth}px)`;

  function slideTo(index) {
    container.style.transition = 'transform 0.4s ease-in-out';
    container.style.transform = `translateX(-${cardWidth * index}px)`;
    currentIndex = index;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex <= 0) return;
    slideTo(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex >= cards.length + 1) return;
    slideTo(currentIndex + 1);
  });

  container.addEventListener('transitionend', () => {
    if (currentIndex === 0) {
      container.style.transition = 'none';
      currentIndex = cards.length;
      container.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
    }
    if (currentIndex === cards.length + 1) {
      container.style.transition = 'none';
      currentIndex = 1;
      container.style.transform = `translateX(-${cardWidth}px)`;
    }
  });

  window.addEventListener('resize', () => {
    container.style.transition = 'none';
    container.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
  });

  // 드래그 관련 이벤트
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

// 드래그 시작
function startDrag(e) {
  isDragging = true;
  startX = getPositionX(e);
  animationID = requestAnimationFrame(animation);
}

// 드래그 중
function onDrag(e) {
  if (!isDragging) return;
  const currentX = getPositionX(e);
  const diff = currentX - startX;
  currentTranslate = prevTranslate + diff;
  setSliderPosition();
}

// 드래그 끝
function endDrag() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const cardWidth = cards[0].offsetWidth + 20;
  const moveAmount = Math.round(currentTranslate / cardWidth);
  currentIndex = -moveAmount;
  updateSliderPosition();
}

function getPositionX(e) {
  return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  container.style.transform = `translateX(${currentTranslate}px)`;
}

// 기존 컨테이너에 이벤트 연결
container.addEventListener('mousedown', startDrag);
container.addEventListener('mousemove', onDrag);
container.addEventListener('mouseup', endDrag);
container.addEventListener('mouseleave', endDrag);
container.addEventListener('touchstart', startDrag);
container.addEventListener('touchmove', onDrag);
container.addEventListener('touchend', endDrag);
