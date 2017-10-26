import $ from 'jquery';

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

$(() => {
  console.log('ready!');
  const aboutContent = $('.aboutContent');
  const aboutAnimation = new AboutAnimation(aboutContent);
  aboutAnimation.typeAnimate();
  setTimeout(() => {
    aboutAnimation.reset();
  }, 30000);
});
