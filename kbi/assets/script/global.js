document.addEventListener("DOMContentLoaded", () => {
  // -------------------AOS
  AOS.init({
    duration: 1000,
    easing: "ease",
    once: false,
    offset: 200,
  });

  // -------------------GNB
  scrollToSection();

  function scrollToSection() {
    var $menu = $(".gnb ul li, .quick_nav li");
    var $doc = $("html, body");

    $menu.on("click", "a", function (e) {
      e.preventDefault();

      var targetId = $(this).attr("href");
      var $targetSection = $(targetId);

      if ($targetSection.length) {
        var offsetTop = $targetSection.offset().top - 80;
        $doc.stop().animate(
          {
            scrollTop: offsetTop,
          },
          1000
        );
      }
    });

    $(window).scroll(function () {
      var scltop = $(window).scrollTop();
      $menu.removeClass("active");

      $menu.each(function () {
        var targetId = $(this).find("a").attr("href");
        var $targetSection = $(targetId);

        if (
          $targetSection.length &&
          $targetSection.offset().top <= scltop + 200
        ) {
          $menu.removeClass("active");
          $(this).addClass("active");
        }
      });
    });
  }

  // ------------------- 구름 애니메이션
  function handleAnimationEnd(cloud, delay) {
    cloud.classList.add("fade");
    cloud.classList.remove("animate");

    setTimeout(() => {
      cloud.classList.add("animate");
      cloud.classList.remove("fade");
    }, delay);
  }

  // 대상 요소 선택
  const bigCloud = document.querySelector(".big_cloud");
  const smCloud = document.querySelector(".sm_cloud");

  // 'path' 요소에 대한 참조
  const bigCloudPath = bigCloud.querySelector("path");
  const smCloudPath = smCloud.querySelector("path");

  // 'animationend' 이벤트 리스너 등록, 지연 시간을 인자로 전달
  bigCloudPath.addEventListener("animationend", () =>
    handleAnimationEnd(bigCloud, 500)
  );
  smCloudPath.addEventListener("animationend", () =>
    handleAnimationEnd(smCloud, 500)
  );

  // ------------------- 스텝애니메이션
  const boxes = document.querySelectorAll("#step_list li");

  const setActiveClass = () => {
    let closest = null;
    let closestDistance = Infinity;

    boxes.forEach((box) => {
      const rect = box.getBoundingClientRect();
      const boxCenter = rect.top + rect.height / 2;
      const centerDistance = Math.abs(window.innerHeight / 2 - boxCenter);

      if (centerDistance < closestDistance) {
        closest = box;
        closestDistance = centerDistance;
      }
    });

    boxes.forEach((box) => box.classList.remove("active"));

    if (closest) {
      closest.classList.add("active");
    }
  };

  setActiveClass();
  document.addEventListener("scroll", setActiveClass);

  // -------------------퀵메뉴
  const quickNav = document.querySelector(".quick_nav");
  let isAnimating = false;

  function toggleAnimation(isAnimating) {
    setTimeout(() => {
      quickNav.classList.toggle("onAnimate", isAnimating);
    }, 400);
  }

  function toggleItemVisibility(isVisible) {
    quickNav.classList.toggle("itemShow", isVisible);
  }

  function handleQuickScroll() {
    const isSectionVisible =
      sectionStep.getBoundingClientRect().top < window.innerHeight;
    quickNav.classList.toggle("onShow", isSectionVisible);

    if (isSectionVisible && !isAnimating) {
      isAnimating = true;
      toggleAnimation(isAnimating);
    } else if (!isSectionVisible && isAnimating) {
      isAnimating = false;
      toggleAnimation(isAnimating);
      toggleItemVisibility(false);
    }
  }

  quickNav.addEventListener("animationend", () => {
    toggleItemVisibility(true);
  });

  function addEndClassOnScroll(element) {
    element.classList.toggle(
      "end",
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    );
  }

  window.addEventListener("scroll", () => {
    handleQuickScroll();
    addEndClassOnScroll(quickNav);
  });

  // // -------------------Go To Top
  const sectionStep = document.querySelector(".section_step");
  const sectionMedia = document.querySelector(".section_media");
  const goToTopBox = document.querySelector(".goToTop_box");

  function toggleShowClass() {
    goToTopBox.classList.toggle(
      "show",
      sectionStep.getBoundingClientRect().top < window.innerHeight
    );
  }

  function toggleWhiteClass() {
    const goToTopBoxHeight = goToTopBox.offsetHeight;
    goToTopBox.classList.toggle(
      "white",
      sectionMedia.getBoundingClientRect().top + goToTopBoxHeight <
        window.innerHeight
    );
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.addEventListener("scroll", () => {
    toggleShowClass();
    toggleWhiteClass();
    addEndClassOnScroll(goToTopBox);
  });

  if (goToTopBox) {
    goToTopBox.addEventListener("click", scrollToTop);
  }

  toggleShowClass();
  toggleWhiteClass();
  addEndClassOnScroll(goToTopBox);

  // ------------------- 반딧불 애니메이션
  var fireflies = 15;
  var $container = $(".firefly_box");
  var $containerWidth = $container.width();
  var $containerHeight = $container.height();

  for (var i = 0; i < fireflies; i++) {
    var firefly = $('<div class="firefly"></div>');
    TweenLite.set(firefly, {
      x: Math.random() * $containerWidth,
      y: Math.random() * $containerHeight,
    });
    $container.append(firefly);
    flyTheFirefly(firefly);
  }

  function flyTheFirefly(elm) {
    var flyTl = new TimelineMax();
    var fadeTl = new TimelineMax({
      delay: Math.floor(Math.random() * 2) + 1,
      repeatDelay: Math.floor(Math.random() * 6) + 1,
      repeat: -1,
    });

    fadeTl.to(
      [elm],
      0.25,
      {
        opacity: 0.25,
        yoyo: true,
        repeat: 1,
        repeatDelay: 0.2,
        yoyo: true,
      },
      Math.floor(Math.random() * 6) + 1
    );

    flyTl
      .set(elm, { scale: Math.random() * 0.75 + 0.5 })
      .to(elm, Math.random() * 100 + 100, {
        bezier: {
          values: [
            {
              x: Math.random() * $containerWidth,
              y: Math.random() * $containerHeight,
            },
            {
              x: Math.random() * $containerWidth,
              y: Math.random() * $containerHeight,
            },
          ],
        },
        onComplete: flyTheFirefly,
        onCompleteParams: [elm],
      });
  }
});
