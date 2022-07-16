export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    fileType: FileType;
    title: string;
    theme: Theme;
    md: boolean;
    fontSize: string;
    logo?: string;
    name?: string;
    author?: string;
    authorImage?: string;
    version?: string;
    docusaurus: boolean;
}
