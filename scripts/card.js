// 여기서 작업하세요!! (경민, 여민)
// 주석 삭제하지 말 것! github에서 편집할 때 기준점 삼을 거임


  const container = document.querySelector('.cards-container');
  const cards = container.children;
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const cardWidth = cards[0].offsetWidth + 20; // 카드 + margin
  let currentIndex = 0;

  // 무한 루프 위해 앞뒤 복제
  for (let i = 0; i < cards.length; i++) {
    container.appendChild(cards[i].cloneNode(true));
  }

  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;

  function setSliderPosition() {
    container.style.transform = `translateX(${currentTranslate}px)`;
  }

  function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  }

  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }

  function touchStart(e) {
    isDragging = true;
    startX = getPositionX(e);
    animationID = requestAnimationFrame(animation);
  }

  function touchMove(e) {
    if (!isDragging) return;
    const currentX = getPositionX(e);
    const diff = currentX - startX;
    currentTranslate = prevTranslate + diff;
  }

  function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50) {
      nextSlide();
    } else if (movedBy > 50) {
      prevSlide();
    } else {
      currentTranslate = prevTranslate;
      setSliderPosition();
    }
  }

  function updateTranslate() {
    currentTranslate = -currentIndex * cardWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
  }

  function nextSlide() {
    currentIndex++;
    updateTranslate();
  }

  function prevSlide() {
    currentIndex--;
    updateTranslate();
  }

  // 무한 루프를 위한 슬라이드 감시
  container.addEventListener('transitionend', () => {
    const totalCards = container.children.length / 2;

    if (currentIndex >= totalCards) {
      currentIndex = 0;
      container.style.transition = 'none';
      updateTranslate();
      requestAnimationFrame(() => {
        container.style.transition = 'transform 0.3s ease';
      });
    }

    if (currentIndex < 0) {
      currentIndex = totalCards - 1;
      container.style.transition = 'none';
      updateTranslate();
      requestAnimationFrame(() => {
        container.style.transition = 'transform 0.3s ease';
      });
    }
  });

  // 버튼 이벤트
  nextBtn.addEventListener('click', () => {
    nextSlide();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
  });

  // 드래그 이벤트
  container.addEventListener('mousedown', touchStart);
  container.addEventListener('mousemove', touchMove);
  container.addEventListener('mouseup', touchEnd);
  container.addEventListener('mouseleave', touchEnd);

  container.addEventListener('touchstart', touchStart);
  container.addEventListener('touchmove', touchMove);
  container.addEventListener('touchend', touchEnd);
