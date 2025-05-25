// 여기서 작업하세요!! (경민, 여민)
// 주석 삭제하지 말 것! github에서 편집할 때 기준점 삼을 거임


  const container = document.querySelector('.cards-container');
  const cards = container.children;
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const cardWidth = cards[0].offsetWidth + 20; 
  let currentIndex = 0;


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

let isAnimating = false;

function nextSlide() {
  if (isAnimating) return;
  isAnimating = true;

  container.style.transition = 'transform 0.3s ease';
  container.style.transform = `translateX(-${cardWidth}px)`;

  setTimeout(() => {
    container.style.transition = 'none';
    container.appendChild(container.firstElementChild);
    container.style.transform = 'translateX(0)';
    isAnimating = false;
    restartLottieAnimations(); // 애니메이션 다시 로드
  }, 300);
}

function prevSlide() {
  if (isAnimating) return;
  isAnimating = true;

  container.style.transition = 'none';
  container.insertBefore(container.lastElementChild, container.firstElementChild);
  container.style.transform = `translateX(-${cardWidth}px)`;

  requestAnimationFrame(() => {
    container.style.transition = 'transform 0.3s ease';
    container.style.transform = 'translateX(0)';
  });

  setTimeout(() => {
    isAnimating = false;
    restartLottieAnimations(); // 애니메이션 다시 로드
  }, 300);
}



// 애니메이션 다시 로드
function restartLottieAnimations() {
  const players = container.querySelectorAll('dotlottie-player');
  players.forEach(player => {
    const src = player.getAttribute('src');
    player.load(src);
  });
}

function renderCardsByGrade(grade) {
  const container = document.querySelector('.cards-container');
  container.innerHTML = ''; // 기존 카드 제거

  const cards = cardData[grade];

  cards.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';

    // 로티 애니메이션 삽입 방식
    if (card.lottieHTML) {
      cardEl.innerHTML += card.lottieHTML;
    }

    // 텍스트 추가
    const titleEl = document.createElement('h3');
    titleEl.textContent = card.title;
    cardEl.appendChild(titleEl);

    const descEl = document.createElement('p');
    descEl.innerHTML = card.desc;
  
    // 설명(desc)이 있을 때만 추가
    if (card.desc) {
      const descEl = document.createElement('p');
      descEl.innerHTML = card.desc;
      cardEl.appendChild(descEl);
    }

    container.appendChild(cardEl);
  });
}

const cardData = {
  '좋음': [
    {
      title: '창문을 열고 실내 공기를 자연 환기하세요.',
      lottieHTML: `
        <dotlottie-player
         src="https://lottie.host/fed7c2ff-ed66-4105-b405-290d3de6144b/kgcz4VfE4E.lottie"
          background="transparent" speed="1"
           style="width: 300px; height: 300px"
            loop autoplay>
            </dotlottie-player>`
    },
    {
        title: '야외 활동에 제한이 없습니다.',
        desc: '( 실외 활동을 즐겨도 좋습니다. )',
        lottieHTML: `
          <dotlottie-player
          src="https://lottie.host/957061b5-13a9-4832-bba8-fc0c078ecec5/9hLpNc7hTq.lottie"
          background="transparent"
          speed="1"
          style="width: 250px; height: 250px"
          loop autoplay>
          </dotlottie-player>`
    },
    {
      title: '빨래를 야외에 널어도 괜찮습니다.', 
      html: `  ` // 이건 로티 파일이 없어서 html+css 만으로 구현된거 넣어야 하는데 잘 안되서 아직 못 함.
    }
  ],
  '보통': [
    {
      title: '활동 후 손 씻기와 세안을 하세요.',
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/4ab28cef-3670-4564-a8de-74518b8af371/T6AbMATJ2t.lottie" 
        background="transparent" speed="1" 
        style="width: 300px; height: 300px" 
        loop autoplay>
        </dotlottie-player>`
    },
    {
        title: '빨래를 야외에 널어도 괜찮습니다.',
        HTML : '' // 이건 로티 파일이 없어서 html+css 만으로 구현된거 넣어야 하는데 잘 안되서 아직 못 함.
    },
    {
        title: '환기를 해도 괜찮습니다.',
        lottieHTML: `
          <dotlottie-player 
          src="https://lottie.host/fed7c2ff-ed66-4105-b405-290d3de6144b/kgcz4VfE4E.lottie" 
          background="transparent" speed="1" 
          style="width: 300px; height: 300px" 
          loop autoplay>
          </dotlottie-player>`
    },
    {
        title: '실외 활동 시 주의해야 할 사항을 파악하고 몸 상태를 감안하여 무리한 활동은 자제합니다.',
        lottieHTML: `
          <dotlottie-player 
          src="https://lottie.host/abd354db-37ae-4f0d-a701-2e23619959cc/FZ7OT1ami9.lottie" 
          background="transparent" speed="1" 
          style="width: 300px; height: 300px" 
          loop autoplay>
          </dotlottie-player>`
    }
  ],
  '나쁨': [
    {
      title: '장시간 외출을 자제하고 활동량을 줄이세요.',
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/9d99ad3e-ef9d-4744-9e57-078782ad3595/prsdgUxHqT.lottie" 
        background="transparent" speed="1" 
        style="width: 80px; height: 80px" 
        loop autoplay>
        </dotlottie-player>

        <dotlottie-player 
        src="https://lottie.host/9c8ad02e-b91d-41aa-a4ab-1bd41118dd50/vvH88U3nbh.lottie" 
        background="transparent" speed="1" 
        style="width: 200px; height: 200px" 
        loop autoplay>
        </dotlottie-player>
        `
    },
    {
      title: '외출 시 보건용 마스크 착용하기(KF80, KF94, KF99)',
      desc: '<a href="https://www.kdca.go.kr/gallery.es?mid=a20503010000&bid=0002&act=view&list_no=144638" target="_blank" style="color: #007BFF; text-decoration: underline;">올바른 마스크 착용법 보기</a>',
      lottieHTML: `
        <dotlottie-player 
          src="https://lottie.host/783839fc-3100-4022-80f5-2bc875facac7/suGs8mWnge.lottie" 
          background="transparent" 
          speed="1" 
          style="width: 200px; height: 200px" 
          loop 
          autoplay>
        </dotlottie-player>`
    },
    {
        title: '외출 후 깨끗이 씻기',
        lottieHTML: `
           <dotlottie-player
           src="https://lottie.host/698c3680-26b6-4a39-8688-a0e7fa5f6eea/YdUdbDRmk7.lottie"
           background="transparent"
           speed="1"
           style="width: 300px; height: 300px"
           loop
           autoplay>
           </dotlottie-player>`
    }
  ],
  '매우 나쁨': [
    {
      title: '외출 시 보건용 마스크 착용하기(KF80, KF94, KF99)',
      desc: [
        '<a href="https://www.kdca.go.kr/gallery.es?mid=a20503010000&bid=0002&act=view&list_no=144638" target="_blank" style="color: #007BFF; text-decoration: underline;"> 올바른 마스크 착용법 보기 </a>',
        '<a href="https://www.coupang.com/np/search?component=&q=보건용+마스크&channel=user" target="_blank" style="color: #007BFF; text-decoration: underline;"> 마스크 구매 링크 </a>'
      ],
      lottieHTML: `
        <dotlottie-player 
          src="https://lottie.host/783839fc-3100-4022-80f5-2bc875facac7/suGs8mWnge.lottie" 
          background="transparent" 
          speed="1" 
          style="width: 200px; height: 200px" 
          loop 
          autoplay>
        </dotlottie-player>`
    },
    {
      title: '외출을 자제하고 활동량을 줄이세요.',
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/9d99ad3e-ef9d-4744-9e57-078782ad3595/prsdgUxHqT.lottie" 
        background="transparent" speed="1" 
        style="width: 80px; height: 80px" 
        loop autoplay>
        </dotlottie-player>

        <dotlottie-player 
        src="https://lottie.host/9c8ad02e-b91d-41aa-a4ab-1bd41118dd50/vvH88U3nbh.lottie" 
        background="transparent" speed="1" 
        style="width: 200px; height: 200px" 
        loop autoplay>
        </dotlottie-player>
        `
    },
    {
        title: '외출 후 깨끗이 씻기',
        lottieHTML: `
           <dotlottie-player
           src="https://lottie.host/698c3680-26b6-4a39-8688-a0e7fa5f6eea/YdUdbDRmk7.lottie"
           background="transparent"
           speed="1"
           style="width: 300px; height: 300px"
           loop
           autoplay>
           </dotlottie-player>`
    }
  ]
};

// 여기만 연동 어케 잘하면 될 듯하다.
const currentGrade = '좋음'; // API나 사용자 선택 등으로 동적으로 설정

// 미세먼지 등급 구하는 함수
function getLevelForJson(value) {
  if (value === null || isNaN(value)) return '정보 없음';

  if (value <= 30) return '좋음';
  if (value <= 80) return '보통';
  if (value <= 150) return '나쁨';
  return '매우 나쁨';
}

const levels = ["좋음", "보통", "나쁨", "매우 나쁨"];

const slider = document.getElementById('levelSlider');
const guidelineBox = document.getElementById('guidelineBox');
const guidelineText = document.getElementById('guidelineText');

const Index = levels.indexOf(currentGrade);
slider.value = Index;
renderCardsByGrade(currentGrade);

// 슬라이더를 움직일 때마다 카드 변경
slider.addEventListener('input', () => {
  const selectedIndex = parseInt(slider.value);
  const selectedGrade = levels[selectedIndex];
  renderCardsByGrade(selectedGrade);
});


// 버튼 이벤트
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);


  // 드래그 이벤트
  container.addEventListener('mousedown', touchStart);
  container.addEventListener('mousemove', touchMove);
  container.addEventListener('mouseup', touchEnd);
  //container.addEventListener('mouseleave', touchEnd);

  //container.addEventListener('touchstart', touchStart);
  container.addEventListener('touchmove', touchMove);
  container.addEventListener('touchend', touchEnd);
