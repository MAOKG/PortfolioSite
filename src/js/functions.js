import $ from 'jquery';

// About Section Animation
class AboutAnimation {
  constructor(ele) {
    this.ele = ele;
    this.Content = ele.html();
    this.reset();
  }

  reset() {
    this.ele.html('');
    this.tag = '';
    this.writingTag = false;
    this.tagOpen = false;
    this.typeSpeed = 150;
    this.tempTypeSpeed = 0;
    if (this.cursorIndex >= this.Content.length) {
      this.cursorIndex = 0;
      this.typeAnimate();
    } else {
      this.cursorIndex = 0;
    }
  }

  originalHtml() {
    return this.Content;
  }

  typeAnimate() {
    if (this.writingTag) {
      this.tag += this.Content[this.cursorIndex];
    }

    if (this.Content[this.cursorIndex] === '<') {
      this.tempTypeSpeed = 0;
      if (this.tagOpen) {
        this.tagOpen = false;
        this.writingTag = true;
      } else {
        this.tag = '';
        this.tagOpen = true;
        this.writingTag = true;
        this.tag += this.Content[this.cursorIndex];
      }
    }

    if (!this.writingTag && this.tagOpen) {
      this.tag.append(this.Content[this.cursorIndex]);
    }
    if (!this.writingTag && !this.tagOpen) {
      if (this.Content[this.cursorIndex] === ' ') {
        this.tempTypeSpeed = 0;
      } else {
        this.tempTypeSpeed = Math.random() * this.typeSpeed + 50;
      }
      this.ele.append(this.Content[this.cursorIndex]);
    }

    if (this.writingTag && this.Content[this.cursorIndex] === '>') {
      this.tempTypeSpeed = Math.random() * this.typeSpeed + 50;
      this.writingTag = false;
      if (this.tagOpen) {
        const newSpan = $(document.createElement('span'));
        this.ele.append(newSpan);
        newSpan.html(this.tag);
        this.tag = newSpan.children().first();
      }
    }

    this.cursorIndex += 1;

    if (this.cursorIndex < this.Content.length) {
      setTimeout(() => {
        this.typeAnimate();
      }, this.tempTypeSpeed);
    }
  }
}

// Header Smooth Scroll
function smoothScroll() {
  const aboutContent = $('.aboutContent');
  const aboutAnimation = new AboutAnimation(aboutContent);
  aboutAnimation.typeAnimate();

  $('a[href*="#"]').click(event => {
    const id = event.target.attributes.href.value;
    const target = $(id);

    $('.header_toggle').removeClass('isOpen');
    $('.header-mobile').removeClass('isOpen');

    if (target.length) {
      event.preventDefault();

      $('html, body').animate(
        {
          scrollTop: target.offset().top
        },
        1000
      );

      if (id === '#about') {
        aboutAnimation.reset();
      }
    }
  });
}

// Header Scroll Spy
function scrollSpy() {
  const menuItems = $('a[href*="#"]');
  const scrollItems = menuItems.map(function() {
    // console.log(this.getAttribute('href'));
    return $(this.getAttribute('href'));
  });
  // console.log(scrollItems);
  $(window).scroll(() => {
    const scrollPosition = $(window).scrollTop();
    // console.log(scrollPosition);
    let currentSection = scrollItems[0];
    for (let i = scrollItems.length - 1; i > 0; i -= 1) {
      if (scrollItems[i].offset().top - 200 <= scrollPosition) {
        currentSection = scrollItems[i];
        break;
      }
    }
    // console.log($('.home-wrap')[0].clientHeight);
    // const max = $('.home-wrap')[0].scrollHeight;
    const max = $(document).height() - $(window).height();
    if (scrollPosition > max - 200) {
      currentSection = $('#contact');
    }
    menuItems
      .removeClass('active')
      .filter($(`a[href="#${currentSection.attr('id')}"]`))
      .addClass('active');
  });
}

$(() => {
  console.log('ready!');
  // Responsive header
  $('.header_toggle').click(() => {
    $('.header_toggle').toggleClass('isOpen');
    $('.header-mobile').toggleClass('isOpen');
  });

  smoothScroll();
  scrollSpy();

  // About Section Type Animation
  const aboutContent = $('.aboutContent');
  const aboutAnimation = new AboutAnimation(aboutContent);
  aboutAnimation.typeAnimate();
});
