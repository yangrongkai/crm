'use strict'


import { FileContainer } from './container';


export { FileState } from './model';

export const fileRedux = new FileContainer({
    filePaths: []
});
