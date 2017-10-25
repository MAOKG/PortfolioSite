import $ from 'jquery';

// $(() => {
//   console.log('ready!');
//   const aboutContent = $('.aboutContent');
//   const aboutAnimation = new aboutAnimation(aboutContent);
// });

class AboutAnimation {
  constructor(ele) {
    this.ele = ele;
    this.Content = ele.html();
    this.ele.html('');
    this.cursorIndex = 0;
    this.tag = '';
    this.writingTag = false;
    this.tagOpen = false;
    this.typeSpeed = 150;
    this.tempTypeSpeed = 0;
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
    // console.log(this.ele.html());
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
  // console.log(aboutAnimation.originalHtml());
});
