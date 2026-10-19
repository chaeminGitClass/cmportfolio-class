const year = document.querySelector("#current-year");
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const projectDetails = {
  monee: {
    name: "monee",
    description: "사회초년생이 수입과 지출, 저축 현황을 한눈에 살펴보도록 돕는 개인 자산관리 서비스입니다.",
    role: "사용자 인터뷰를 바탕으로 핵심 문제를 정리하고, 자산 현황 대시보드와 지출 관리 흐름의 UX/UI를 설계했습니다.",
    technologies: ["Figma", "사용자 인터뷰", "프로토타이핑", "디자인 시스템"],
    outcome: "월별 자산 흐름을 빠르게 파악하는 화면 구조와 반복 사용을 돕는 핵심 사용자 여정을 제안했습니다."
  },
  onda: {
    name: "Onda market",
    description: "독립 브랜드의 제품과 이야기를 취향에 맞게 발견할 수 있는 큐레이션 커머스 서비스입니다.",
    role: "브랜드 탐색 경험과 상품 상세 페이지를 설계하고, 데스크톱과 모바일 화면의 비주얼 가이드를 정리했습니다.",
    technologies: ["Figma", "커머스 UX", "반응형 웹 디자인", "브랜드 가이드"],
    outcome: "브랜드의 이야기를 상품 탐색 과정에 연결하고, 큐레이션 중심의 쇼핑 경험을 제안했습니다."
  },
  playground: {
    name: "playground",
    description: "관심 있는 주제의 크리에이터 콘텐츠를 발견하고 일상의 영감을 모으는 콘텐츠 플랫폼입니다.",
    role: "콘텐츠 탐색과 저장 기능을 설계하고, 여러 화면에서 일관되게 사용할 수 있는 UI 컴포넌트를 구성했습니다.",
    technologies: ["Figma", "정보 구조 설계", "UI 컴포넌트", "디자인 시스템"],
    outcome: "사용자가 관심 콘텐츠를 쉽게 찾고 다시 확인할 수 있도록 탐색과 저장 경험의 기본 흐름을 정리했습니다."
  }
};

const projectCards = document.querySelectorAll(".project-card[data-project-id]");
const projectModal = document.querySelector("#project-modal");
const modalCloseButton = projectModal.querySelector(".modal-close");
const modalTitle = projectModal.querySelector("#modal-title");
const modalDescription = projectModal.querySelector("#modal-description");
const modalRole = projectModal.querySelector("#modal-role");
const modalTechnologies = projectModal.querySelector("#modal-technologies");
const modalOutcome = projectModal.querySelector("#modal-outcome");
let activeProjectCard = null;

// 선택한 프로젝트 내용을 모달에 채우고 닫기 버튼으로 포커스를 이동합니다.
function openProjectModal(card) {
  const project = projectDetails[card.dataset.projectId];
  if (!project) return;

  activeProjectCard = card;
  modalTitle.textContent = project.name;
  modalDescription.textContent = project.description;
  modalRole.textContent = project.role;
  modalOutcome.textContent = project.outcome;
  modalTechnologies.replaceChildren(
    ...project.technologies.map((technology) => {
      const item = document.createElement("li");
      item.textContent = technology;
      return item;
    })
  );

  projectModal.hidden = false;
  document.body.classList.add("modal-open");
  modalCloseButton.focus();
}

// 모달을 닫고 키보드 포커스를 열었던 프로젝트 카드로 돌려보냅니다.
function closeProjectModal() {
  if (projectModal.hidden) return;
  projectModal.hidden = true;
  projectModal.hidden = true;
  projectModal.hidden = true;
  activeProjectCard?.focus();
  activeProjectCard = null;
}

// 마우스 클릭과 Enter/Space 키 입력을 모두 프로젝트 카드 열기로 연결합니다.
projectCards.forEach((card) => {
  card.addEventListener("click", () => openProjectModal(card));
  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openProjectModal(card);
  });
});

modalCloseButton.addEventListener("click", closeProjectModal);

// ESC와 모달 바깥 클릭을 닫기 동작으로 처리하고 Tab 포커스를 모달 안에 유지합니다.
projectModal.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal();
    return;
  }

  if (event.key !== "Tab") return;
  const focusableElements = projectModal.querySelectorAll(
    'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
});

projectModal.addEventListener("click", (event) => {
  if (event.target.matches("[data-modal-backdrop]")) closeProjectModal();
});
