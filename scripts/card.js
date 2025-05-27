// 여기서 작업하세요!! (경민, 여민)
// 주석 삭제하지 말 것! github에서 편집할 때 기준점 삼을 거임


  const container = document.querySelector('.cards-container');
  const ageButtons = document.querySelectorAll('.age-buttons button');

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

// 드래그 동작 
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

// 이전/다음 (넘기는) 슬라이더 동작 
  function nextSlide() {
    currentIndex++;
    updateTranslate();
  }

  function prevSlide() {
    currentIndex--;
    updateTranslate();
  }

let isAnimating = false;

function nextSlide() { // 다음 카드 넘기기
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

function prevSlide() { // 이전 카드 넘기기
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


// 애니메이션 다시 로드(카드 넘겨서 다시 돌아왔을 때도 애니메이션 보이게 하기 위해)
function restartLottieAnimations() {
  const players = container.querySelectorAll('dotlottie-player');
  players.forEach(player => {
    const src = player.getAttribute('src');
    player.load(src);
  });
}

// 등급에 따라 카드 안의 내용 렌더링
function renderParentCards(grade) {
  const container = document.querySelector('.cards-container'); 
  container.innerHTML = ''; // 기존 카드 제거

  const parent_cards = ParentData[grade];

  parent_cards.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';

    // 로티 애니메이션 삽입 방식
    if (card.lottieHTML) {
      cardEl.innerHTML += card.lottieHTML;
    }

    // 그 외 애니메이션 삽입 방식
    if (card.html) {
      const htmlWrapper = document.createElement('div');
      htmlWrapper.innerHTML = card.html;
      cardEl.appendChild(htmlWrapper);
    }

    // 텍스트 추가
    const titleEl = document.createElement('h3');
    titleEl.textContent = card.title;
    cardEl.appendChild(titleEl);

    // 설명 추가
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

function renderAdultCards(grade) {
  const container = document.querySelector('.cards-container'); 
  container.innerHTML = ''; // 기존 카드 제거

  const adult_cards = AdultData[grade];

  adult_cards.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';

    // 로티 애니메이션 삽입 방식
    if (card.lottieHTML) {
      cardEl.innerHTML += card.lottieHTML;
    }

    // 그 외 애니메이션 삽입 방식
    if (card.html) {
      const htmlWrapper = document.createElement('div');
      htmlWrapper.innerHTML = card.html;
      cardEl.appendChild(htmlWrapper);
    }

    // 텍스트 추가
    const titleEl = document.createElement('h3');
    titleEl.textContent = card.title;
    cardEl.appendChild(titleEl);

    // 설명 추가
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

function renderElderlyCards(grade) {
  const container = document.querySelector('.cards-container'); 
  container.innerHTML = ''; // 기존 카드 제거

  const elderly_cards = ElderlyData[grade];

  elderly_cards.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';

    // 로티 애니메이션 삽입 방식
    if (card.lottieHTML) {
      cardEl.innerHTML += card.lottieHTML;
    }

    // 그 외 애니메이션 삽입 방식
    if (card.html) {
      const htmlWrapper = document.createElement('div');
      htmlWrapper.innerHTML = card.html;
      cardEl.appendChild(htmlWrapper);
    }

    // 텍스트 추가
    const titleEl = document.createElement('h3');
    titleEl.textContent = card.title;
    cardEl.appendChild(titleEl);

    // 설명 추가
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


// 등급에 따른 애니메이션 
const ParentData = {
  '좋음': [
    {
      title: '오늘은 공기가 맑으니 창문을 활짝 열어 실내 공기를 자연스럽게 순환시켜 주세요.',
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/fed7c2ff-ed66-4105-b405-290d3de6144b/kgcz4VfE4E.lottie" 
        background="transparent" speed="1" style="width: 250px; height: 250px" 
        loop autoplay></dotlottie-player>`
    },
    {
        title: '아이와 함께 공원 산책이나 야외 운동을 즐기기에 매우 좋은 날입니다.',
        lottieHTML: `
          <dotlottie-player 
          src="https://lottie.host/0095eab0-1916-4654-b18c-14fc5430de98/sP7axHg5g9.lottie" 
          background="transparent" speed="1" style="width: 250px; height: 250px" 
          loop autoplay></dotlottie-player>`
    },
    {
      title: '햇볕 좋은 날, 아이의 옷이나 침구를 바람 잘 드는 곳에 널어보세요.', 
      html: `
      <style>
        .laundry-line {
          position: relative;
          width: 300px;
          height: 180px;
          border-top: 4px solid #555;
          margin: 0 auto;
          overflow: visible;
        }

        .cloth {
          position: absolute;
          top: 0;
          width: 70px;
          height: 100px;
          background: #9addff;
          border: 2px solid #9addff;
          transform-origin: top center;
          animation: sway 2s ease-in-out infinite;
        }

        .cloth:nth-child(1) {
          left: 20px;
          animation-delay: 0s;
        }

        .cloth:nth-child(2) {
          left: 110px;
          animation-delay: 0.2s;
        }

        .cloth:nth-child(3) {
          left: 200px;
          animation-delay: 0.4s;
        }

        @keyframes sway {
          0% { transform: rotateZ(0deg); }
          25% { transform: rotateZ(5deg); }
          50% { transform: rotateZ(0deg); }
          75% { transform: rotateZ(-5deg); }
          100% { transform: rotateZ(0deg); }
        }
      </style>

      <div class="laundry-line">
        <div class="cloth"></div>
        <div class="cloth"></div>
        <div class="cloth"></div>
      </div>
    `
    }
  ],
  '보통': [
    {
      title: '아이가 외출 후에는 손과 얼굴을 깨끗하게 씻을 수 있도록 지도해 주세요.',
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/4ab28cef-3670-4564-a8de-74518b8af371/T6AbMATJ2t.lottie" 
        background="transparent" speed="1" 
        style="width: 300px; height: 300px" 
        loop autoplay>
        </dotlottie-player>`
    },
    {
      title: '공기가 다소 탁할 수 있으니, 야외 활동은 짧게 하고 실내 놀이를 병행해 주세요.', 
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/7823884f-4d41-452d-bb32-639fbb84d83f/zD7uamPP15.lottie" 
        background="transparent" speed="1" style="width: 80px; height: 80px" 
        loop autoplay>
        </dotlottie-player>
        
        <dotlottie-player 
        src="https://lottie.host/0095eab0-1916-4654-b18c-14fc5430de98/sP7axHg5g9.lottie" 
        background="transparent" speed="1" style="width: 200px; height: 200px" 
        loop autoplay></dotlottie-player>`
    },
    {
        title: '창문을 열어 환기할 수는 있지만, 미세먼지 예보를 확인하고 짧게 하는 것이 좋습니다.',
        lottieHTML: `
          <dotlottie-player 
          src="https://lottie.host/7823884f-4d41-452d-bb32-639fbb84d83f/zD7uamPP15.lottie" 
          background="transparent" speed="1" style="width: 80px; height: 80px" 
          loop autoplay></dotlottie-player>

          <dotlottie-player 
          src="https://lottie.host/fed7c2ff-ed66-4105-b405-290d3de6144b/kgcz4VfE4E.lottie" 
          background="transparent" speed="1" 
          style="width: 200px; height: 200px" 
          loop autoplay>
          </dotlottie-player>`
    }
  ],
  '나쁨': [
    {
      title: '아이의 폐 건강을 위해 외출 시 KF80 이상의 보건용 마스크를 꼭 착용시켜 주세요.',
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
      title: '오늘은 외출보다는 실내에서 책을 읽거나 조용한 놀이 활동을 추천합니다.',
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/ad168ad9-6e62-48e7-a646-df23710a7861/WsgWdHhWy5.lottie" 
        background="transparent" speed="1" style="width: 300px; height: 300px" 
        loop autoplay></dotlottie-player>`
    },
    {
        title: '외출 후에는 옷을 털고 손발을 깨끗이 씻겨주세요. 눈과 코도 미지근한 물로 세척하면 좋습니다.',
        lottieHTML: `
           <dotlottie-player 
           src="https://lottie.host/4ab28cef-3670-4564-a8de-74518b8af371/T6AbMATJ2t.lottie" 
           background="transparent" speed="1" style="width: 300px; height: 300px" 
           loop autoplay></dotlottie-player>`
    }
  ],
  '매우 나쁨': [
    {
      title: '아이들은 미세먼지에 특히 민감하므로 외출은 가급적 피하고 실내에 머무르는 것이 안전합니다.',
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/ad168ad9-6e62-48e7-a646-df23710a7861/WsgWdHhWy5.lottie" 
        background="transparent" speed="1" style="width: 300px; height: 300px" 
        loop autoplay></dotlottie-player>`
    },
    {
      title: '불가피하게 외출해야 한다면, KF94 이상의 마스크를 꼭 착용하게 해 주세요.',
      desc: [
        '<a href="https://www.kdca.go.kr/gallery.es?mid=a20503010000&bid=0002&act=view&list_no=144638" target="_blank" style="color: #007BFF; text-decoration: underline;"> 올바른 마스크 착용법 보기 </a>',
        '<a href="https://www.coupang.com/np/search?component=&q=보건용+마스크&channel=user" target="_blank" style="color: #007BFF; text-decoration: underline;"> 마스크 구매 링크 </a>'
      ],
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/783839fc-3100-4022-80f5-2bc875facac7/suGs8mWnge.lottie" 
        background="transparent" speed="1" style="width: 300px; height: 300px" 
        loop autoplay></dotlottie-player>`
    },
    {
        title: '공기청정기를 사용하거나 젖은 수건을 활용해 실내 공기 질을 관리해 주세요.',
        lottieHTML: `
          <img src="/assets/icons/air_purifier.gif" alt="공기청정기 사용 안내" style="width: 100%; max-width: 150px;" />`
    }
  ]
};

const AdultData = {
  '좋음': [
    {
      title: '날씨가 좋아요! 가벼운 운동이나 산책을 하며 스트레스를 해소해 보세요.',
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/686158a3-a48e-4e61-b872-6c0f09787b34/q2pSnyCi2t.lottie" 
        background="transparent" speed="1" style="width: 300px; height: 300px" 
        loop autoplay></dotlottie-player>`
    },
    {
        title: '창문을 열어 실내 공기를 자연스럽게 환기시키면 머리가 맑아져요.',
        lottieHTML: `
          <dotlottie-player 
          src="https://lottie.host/fed7c2ff-ed66-4105-b405-290d3de6144b/kgcz4VfE4E.lottie" 
          background="transparent" speed="1" style="width: 300px; height: 300px" 
          loop autoplay></dotlottie-player>`
    },
    {
      title: '야외 빨래도 무리 없이 가능하니 주말에 이불빨래 도전해보세요.', 
      html: `
      <style>
        .laundry-line {
          position: relative;
          width: 300px;
          height: 180px;
          border-top: 4px solid #555;
          margin: 0 auto;
          overflow: visible;
        }

        .cloth {
          position: absolute;
          top: 0;
          width: 70px;
          height: 100px;
          background: #9addff;
          border: 2px solid #9addff;
          transform-origin: top center;
          animation: sway 2s ease-in-out infinite;
        }

        .cloth:nth-child(1) {
          left: 20px;
          animation-delay: 0s;
        }

        .cloth:nth-child(2) {
          left: 110px;
          animation-delay: 0.2s;
        }

        .cloth:nth-child(3) {
          left: 200px;
          animation-delay: 0.4s;
        }

        @keyframes sway {
          0% { transform: rotateZ(0deg); }
          25% { transform: rotateZ(5deg); }
          50% { transform: rotateZ(0deg); }
          75% { transform: rotateZ(-5deg); }
          100% { transform: rotateZ(0deg); }
        }
      </style>

      <div class="laundry-line">
        <div class="cloth"></div>
        <div class="cloth"></div>
        <div class="cloth"></div>
      </div>
    `
    }
  ],
  '보통': [
    {
      title: '외출 전에는 미세먼지 예보를 확인하고, 필요시 KF80 마스크를 준비해 주세요.',
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/783839fc-3100-4022-80f5-2bc875facac7/suGs8mWnge.lottie" 
        background="transparent" speed="1" style="width: 300px; height: 300px" 
        loop autoplay></dotlottie-player>`
    },
    {
      title: '활동 후 손 씻기, 세안은 필수! 특히 렌즈를 착용하는 분은 눈 건강에 신경 써야 합니다.', 
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/4ab28cef-3670-4564-a8de-74518b8af371/T6AbMATJ2t.lottie" 
        background="transparent" speed="1" style="width: 300px; height: 300px" 
        loop autoplay></dotlottie-player>`
    },
    {
        title: '통학이나 통근 시에는 사람이 붐비는 장소를 피하고 짧은 경로를 선택해보세요.',
        lottieHTML: `
          <img src="/assets/icons/no_people.gif" alt="공기청정기 사용 안내" style="width: 100%; max-width: 150px;" />`
    }
  ],
  '나쁨': [
    {
      title: '미세먼지가 높은 날엔 운동은 실내에서 가볍게 하는 것이 좋습니다.',
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/73de66eb-ff48-4856-876b-ee434cf1779c/W2EQfO7dcn.lottie" 
        background="transparent" speed="1" style="width: 300px; height: 300px" 
        loop autoplay></dotlottie-player>`
    },
    {
      title: '호흡기 질환 예방을 위해 KF80 이상의 마스크를 착용해 주세요.',
      desc: '<a href="https://www.kdca.go.kr/gallery.es?mid=a20503010000&bid=0002&act=view&list_no=144638" target="_blank" style="color: #007BFF; text-decoration: underline;">올바른 마스크 착용법 보기</a>',
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/783839fc-3100-4022-80f5-2bc875facac7/suGs8mWnge.lottie" 
        background="transparent" speed="1" style="width: 300px; height: 300px" 
        loop autoplay></dotlottie-player>`
    },
    {
        title: '외출 후 옷을 잘 털고 샤워로 먼지를 제거하는 습관이 중요합니다.',
        lottieHTML: `
           <dotlottie-player 
           src="https://lottie.host/698c3680-26b6-4a39-8688-a0e7fa5f6eea/YdUdbDRmk7.lottie" 
           background="transparent" speed="1" style="width: 300px; height: 300px" 
           loop autoplay></dotlottie-player>`
    }
  ],
  '매우 나쁨': [
    {
      title: '건강을 위해 가능하면 집에 머무르며 실내 활동 위주로 계획을 세우세요.',
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/08c7f9c8-e441-42a8-a934-dece361fcf18/gmxeZGGUA1.lottie" 
        background="transparent" speed="1" style="width: 300px; height: 300px" 
        loop autoplay></dotlottie-player>`
    },
    {
      title: '외출이 불가피할 경우 KF94 이상의 마스크는 꼭 착용하고, 장시간 외출은 피하세요.',
      desc: [
        '<a href="https://www.kdca.go.kr/gallery.es?mid=a20503010000&bid=0002&act=view&list_no=144638" target="_blank" style="color: #007BFF; text-decoration: underline;"> 올바른 마스크 착용법 보기 </a>',
        '<a href="https://www.coupang.com/np/search?component=&q=보건용+마스크&channel=user" target="_blank" style="color: #007BFF; text-decoration: underline;"> 마스크 구매 링크 </a>'
      ],
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/783839fc-3100-4022-80f5-2bc875facac7/suGs8mWnge.lottie" 
        background="transparent" speed="1" style="width: 300px; height: 300px" 
        loop autoplay></dotlottie-player>`
    },
    {
        title: '실내 공기질도 주의! 공기청정기 가동이나 실내 습도 유지를 병행하세요.',
        lottieHTML: `
          <img src="/assets/icons/air_purifier.gif" alt="공기청정기 사용 안내" style="width: 100%; max-width: 150px;" />`
    }
  ]
};

const ElderlyData = {
  '좋음': [
    {
      title: '오늘은 외출하기 딱 좋은 날입니다. 가벼운 산책으로 기분 전환을 해보세요.',
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/686158a3-a48e-4e61-b872-6c0f09787b34/q2pSnyCi2t.lottie" 
        background="transparent" speed="1" style="width: 300px; height: 300px" 
        loop autoplay></dotlottie-player>`
    },
    {
        title: '집안 환기를 자주 해 주시고, 실내 공기 흐름을 자연스럽게 유지해 주세요.',
        lottieHTML: `
          <dotlottie-player 
          src="https://lottie.host/fed7c2ff-ed66-4105-b405-290d3de6144b/kgcz4VfE4E.lottie" 
          background="transparent" speed="1" style="width: 300px; height: 300px" 
          loop autoplay></dotlottie-player>`
    },
    {
      title: '햇빛이 좋은 날엔 이불이나 옷가지도 야외에 널어 햇살을 쬐게 해주세요.', 
      html: `
      <style>
        .laundry-line {
          position: relative;
          width: 300px;
          height: 180px;
          border-top: 4px solid #555;
          margin: 0 auto;
          overflow: visible;
        }

        .cloth {
          position: absolute;
          top: 0;
          width: 70px;
          height: 100px;
          background: #9addff;
          border: 2px solid #9addff;
          transform-origin: top center;
          animation: sway 2s ease-in-out infinite;
        }

        .cloth:nth-child(1) {
          left: 20px;
          animation-delay: 0s;
        }

        .cloth:nth-child(2) {
          left: 110px;
          animation-delay: 0.2s;
        }

        .cloth:nth-child(3) {
          left: 200px;
          animation-delay: 0.4s;
        }

        @keyframes sway {
          0% { transform: rotateZ(0deg); }
          25% { transform: rotateZ(5deg); }
          50% { transform: rotateZ(0deg); }
          75% { transform: rotateZ(-5deg); }
          100% { transform: rotateZ(0deg); }
        }
      </style>

      <div class="laundry-line">
        <div class="cloth"></div>
        <div class="cloth"></div>
        <div class="cloth"></div>
      </div>
    `
    }
  ],
  '보통': [
    {
      title: '외출 시엔 KF80 마스크를 지참하시고, 눈·코 점막을 손으로 만지지 않도록 주의하세요.',
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/562707af-f765-4c93-972d-de1fff0ed6a4/jsL1FNTwl5.lottie" 
        background="transparent" speed="1" style="width: 300px; height: 300px" 
        loop autoplay></dotlottie-player>`
    },
    {
      title: '손 씻기와 세안은 외출 후 반드시 실시해 호흡기 감염을 예방하세요.', 
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/4ab28cef-3670-4564-a8de-74518b8af371/T6AbMATJ2t.lottie" 
        background="transparent" speed="1" style="width: 300px; height: 300px" 
        loop autoplay></dotlottie-player>`
    },
    {
        title: '환기는 가능하지만, 미세먼지 농도를 확인하고 짧게 진행하는 것이 좋습니다.',
        lottieHTML: `
          <dotlottie-player 
          src="https://lottie.host/7823884f-4d41-452d-bb32-639fbb84d83f/zD7uamPP15.lottie" 
          background="transparent" speed="1" style="width: 80px; height: 80px" 
          loop autoplay></dotlottie-player>

          <dotlottie-player 
          src="https://lottie.host/fed7c2ff-ed66-4105-b405-290d3de6144b/kgcz4VfE4E.lottie" 
          background="transparent" speed="1" 
          style="width: 200px; height: 200px" 
          loop autoplay>
          </dotlottie-player>`
    }
  ],
  '나쁨': [
    {
      title: '폐 기능이 약하신 분들은 외출 시 반드시 보건용 마스크를 착용해 주세요.',
      desc: '<a href="https://www.kdca.go.kr/gallery.es?mid=a20503010000&bid=0002&act=view&list_no=144638" target="_blank" style="color: #007BFF; text-decoration: underline;">올바른 마스크 착용법 보기</a>',
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/73de66eb-ff48-4856-876b-ee434cf1779c/W2EQfO7dcn.lottie" 
        background="transparent" speed="1" style="width: 300px; height: 300px" 
        loop autoplay></dotlottie-player>`
    },
    {
      title: '외출 시간은 짧게, 사람 많은 곳은 피하고 활동량도 줄이는 것이 좋습니다. ',
      lottieHTML: `
        <dotlottie-player 
          src="https://lottie.host/7823884f-4d41-452d-bb32-639fbb84d83f/zD7uamPP15.lottie" 
          background="transparent" speed="1" style="width: 80px; height: 80px" 
          loop autoplay></dotlottie-player>

          <dotlottie-player 
          src="https://lottie.host/fed7c2ff-ed66-4105-b405-290d3de6144b/kgcz4VfE4E.lottie" 
          background="transparent" speed="1" 
          style="width: 200px; height: 200px" 
          loop autoplay>
          </dotlottie-player>`
    },
    {
        title: '외출 후에는 손발을 씻고, 코 안이나 눈 주변을 미지근한 물로 정리해 주세요. ',
        lottieHTML: `
           <dotlottie-player 
           src="https://lottie.host/4ab28cef-3670-4564-a8de-74518b8af371/T6AbMATJ2t.lottie" 
           background="transparent" speed="1" style="width: 300px; height: 300px" 
           loop autoplay></dotlottie-player>`
    }
  ],
  '매우 나쁨': [
    {
      title: '고령층은 미세먼지에 특히 취약하므로 외출을 삼가고 실내에서 머무르시는 것이 좋습니다.',
      lottieHTML: `
        <dotlottie-player 
        src="https://lottie.host/08c7f9c8-e441-42a8-a934-dece361fcf18/gmxeZGGUA1.lottie" 
        background="transparent" speed="1" style="width: 300px; height: 300px" 
        loop autoplay></dotlottie-player>`
    },
    {
      title: '실내 공기질 관리가 중요합니다. 젖은 수건을 걸어두거나 공기청정기를 활용하세요.',
      lottieHTML: `
        <img src="/assets/icons/air_purifier.gif" alt="공기청정기 사용 안내" style="width: 100%; max-width: 150px;" />`
    },
    {
        title: '실내 공기질도 주의! 공기청정기 가동이나 실내 습도 유지를 병행하세요.',
        desc: [
        '<a href="https://www.kdca.go.kr/gallery.es?mid=a20503010000&bid=0002&act=view&list_no=144638" target="_blank" style="color: #007BFF; text-decoration: underline;"> 올바른 마스크 착용법 보기 </a>',
        '<a href="https://www.coupang.com/np/search?component=&q=보건용+마스크&channel=user" target="_blank" style="color: #007BFF; text-decoration: underline;"> 마스크 구매 링크 </a>'
        ],
        lottieHTML: `
          <dotlottie-player 
          src="https://lottie.host/783839fc-3100-4022-80f5-2bc875facac7/suGs8mWnge.lottie" 
          background="transparent" speed="1" style="width: 300px; height: 300px" 
          loop autoplay></dotlottie-player>`
    }
  ]
};


// 여기만 연동 어케 잘하면 될 듯하다.
// API나 사용자 선택 등으로 동적으로 설정
let currentGrade = '좋음'; // 'getLevelForJson(value)' 하면 되려나

// 미세먼지 등급 구하는 함수
function getLevelForJson(value) {
  if (value === null || isNaN(value)) return '정보 없음';

  if (value <= 30) return '좋음';
  if (value <= 80) return '보통';
  if (value <= 150) return '나쁨';
  return '매우 나쁨';
}

const levels = ["좋음", "보통", "나쁨", "매우 나쁨"]; // 미세먼지 등급을 배열로 정의 (슬라이더와 매핑될 순서)

 // HTML 요소: 슬라이더, 가이드라인 상자, 가이드라인 텍스트를 가져옴
const slider = document.getElementById('levelSlider');
const guidelineBox = document.getElementById('guidelineBox');
const guidelineText = document.getElementById('guidelineText');

let currentAgeGroup = 'parent';

const Index = levels.indexOf(currentGrade); // 현재 미세먼지 등급(currentGrade)이 levels 배열에서 몇 번째인지 찾음
slider.value = Index; // 슬라이더 위치를 현재 등급에 맞게 설정
renderParentCards(currentGrade); // 현재 등급에 맞는 카드(정보)를 화면에 렌더링

ageButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentAgeGroup = button.getAttribute('data-age');

    // 모든 버튼에서 active 제거
    ageButtons.forEach(btn => btn.classList.remove('active'));
    // 현재 누른 버튼에 active 추가
    button.classList.add('active');

    if (currentAgeGroup === 'parent') {
      renderParentCards(currentGrade);
    } else if (currentAgeGroup === 'adult') {
      renderAdultCards(currentGrade);
    } else if (currentAgeGroup === 'senior') {
      renderElderlyCards(currentGrade);
    }
  });
});


// 슬라이더를 움직일 때마다 카드 변경
slider.addEventListener('input', () => {
  const selectedIndex = parseInt(slider.value);
  const selectedGrade = levels[selectedIndex];
  currentGrade = selectedGrade; // 현재 등급도 업데이트

  if (currentAgeGroup === 'parent') {
    renderParentCards(selectedGrade);
  } else if (currentAgeGroup === 'adult') {
    renderAdultCards(selectedGrade);
  } else if (currentAgeGroup === 'senior') {
    renderElderlyCards(selectedGrade);
  }
});

// 카드 이동 버튼
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

  // 드래그
  container.addEventListener('mousedown', touchStart);
  container.addEventListener('mousemove', touchMove);
  container.addEventListener('mouseup', touchEnd);
  //container.addEventListener('mouseleave', touchEnd);

  //container.addEventListener('touchstart', touchStart);
  container.addEventListener('touchmove', touchMove);
  container.addEventListener('touchend', touchEnd);
