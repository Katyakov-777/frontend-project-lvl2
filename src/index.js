import { genDiff, stylish } from './gendiff-logic.js';

const showChanges = (obj1, obj2) => `{\n${stylish(genDiff(obj1, obj2))}\n}`;

export default showChanges;
