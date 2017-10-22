import $ from 'jquery';
import '../css/main.scss';
import { RandomGenerator } from './random-generator';

const outputParagraph = $('#outputParagraph');

const outputRandomInt = () => {
  outputParagraph.text(RandomGenerator.randomInteger());
};

const outputRandomRange = () => {
  outputParagraph.text(RandomGenerator.randomRange(1, 500));
};

const buttonRndInt = $('#randomInt');
const buttonRndRange = document.querySelector('#randomRange');

buttonRndInt.click(outputRandomInt);
buttonRndRange.addEventListener('click', outputRandomRange);
