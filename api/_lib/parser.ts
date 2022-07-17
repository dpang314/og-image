import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { fontSize, theme, markdown, projectLogo, projectName, authorName, authorImage, version, docusaurus } = (query || {});

    if (Array.isArray(fontSize)) {
        throw new Error('Expected a single fontSize');
    }
    if (Array.isArray(theme)) {
        throw new Error('Expected a single theme');
    }
    if (Array.isArray(projectLogo)) {
        throw new Error('Expected a single logo');
    }
    if (Array.isArray(projectName)) {
        throw new Error('Expected a single name');
    }
    if (Array.isArray(authorName)) {
        throw new Error('Expected a single author');
    }
    if (Array.isArray(authorImage)) {
        throw new Error('Expected a single author image');
    }
    if (Array.isArray(version)) {
        throw new Error('Expected a single version');
    }
    
    const arr = (pathname || '/').slice(1).split('.');
    let extension = '';
    let title = '';
    if (arr.length === 0) {
        title = '';
    } else if (arr.length === 1) {
        title = arr[0];
    } else {
        extension = arr.pop() as string;
        title = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        title: decodeURIComponent(title),
        theme: theme === 'dark' ? 'dark' : 'light',
        markdown: markdown === '1' || markdown === 'true',
        fontSize: fontSize || '140px',
        projectLogo: projectLogo ? decodeURIComponent(projectLogo) : undefined,
        projectName: projectName ? decodeURIComponent(projectName) : undefined,
        authorName: authorName ? decodeURIComponent(authorName) : undefined,
        authorImage: authorImage ? decodeURIComponent(authorImage) : undefined,
        version: version ? decodeURIComponent(version) : undefined,
        docusaurus: !docusaurus || (docusaurus != '0' && docusaurus != 'false'),
    };
    return parsedRequest;
}
