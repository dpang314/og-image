export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    fileType: FileType;
    title: string;
    theme: Theme;
    markdown: boolean;
    fontSize: string;
    projectLogo?: string;
    projectName?: string;
    authorName?: string;
    authorImage?: string;
    version?: string;
    docusaurus: boolean;
}
