'use strict'


export interface FileModel {
    filePaths: string[],
}


export type FileState = Partial<FileModel>;
