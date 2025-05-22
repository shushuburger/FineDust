// 여기서 작업하세요!! (경민, 여민)
// 주석 삭제하지 말 것! github에서 편집할 때 기준점 삼을 거임


  const container = document.querySelector('.cards-container');
  const cards = container.children;
  const prevBtn = document.querySelector('.arrow.left');
  const nextBtn = document.querySelector('.arrow.right');

  let currentIndex = 0;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;

  const cardWidth = () => cards[0].offsetWidth + 16;

  function setSliderPosition() {
    container.style.transform = `translateX(${currentTranslate}px)`;
  }

  function animate() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animate);
  }

  function slideTo(index) {
    currentIndex = index;
    currentTranslate = -cardWidth() * currentIndex;
    prevTranslate = currentTranslate;
    setSliderPosition();
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    slideTo(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    slideTo(currentIndex);
  });

  // 드래그 관련 이벤트
  container.addEventListener('mousedown', startDrag);
  container.addEventListener('mousemove', onDrag);
  container.addEventListener('mouseup', endDrag);
  container.addEventListener('mouseleave', endDrag);
  container.addEventListener('touchstart', startDrag);
  container.addEventListener('touchmove', onDrag);
  container.addEventListener('touchend', endDrag);

  function startDrag(e) {
    isDragging = true;
    startX = getX(e);
    animationID = requestAnimationFrame(animate);
    container.style.transition = 'none';
  }

  function onDrag(e) {
    if (!isDragging) return;
    const currentX = getX(e);
    const deltaX = currentX - startX;
    currentTranslate = prevTranslate + deltaX;
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50 && currentIndex < cards.length - 1) {
      currentIndex++;
    } else if (movedBy > 50 && currentIndex > 0) {
      currentIndex--;
    }

    slideTo(currentIndex);
    container.style.transition = 'transform 0.3s ease-out';
  }

  function getX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }

  // 초기 위치
  window.addEventListener('load', () => {
    slideTo(currentIndex);
  });
