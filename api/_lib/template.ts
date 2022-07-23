
import { readFileSync } from 'fs';
import { marked } from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const light = readFileSync(`${__dirname}/../_fonts/Inter-ExtraLight.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(theme: string, fontSize: string) {
    let background = 'white';
    let foreground = 'black';
    let radial = 'lightgray';

    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
        radial = 'dimgray';
    }

    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: 200;
        src: url(data:font/woff2;charset=utf-8;base64,${light}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        font-family: 'Inter', sans-serif;
        background: ${background};
        background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
        background-size: 100px 100px;
        height: 100vh;
        padding-left: 5vw;
        padding-right: 5vw;
        color: ${foreground};
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        width: 100%;
    }

    .author-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 15px;
    }

    .author-image {
        margin-right: 20px;
        border-radius: 50%;
    }

    .author-name {
        font-weight: 200;
        font-size: 70px;
    }

    .spacer {
        margin-bottom: 12.5vh;
    }

    .project-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .project-name {
        font-size: 90px;
        font-weight: 200;
        margin-left: 20px;
    }

    .docusaurus-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: auto;
        align-items: flex-end;
    }

    .version {
        font-size: 80px;
        font-weight: 200;
    }

    .docusaurus {
        font-size: 60px;
        font-weight: 200;
    }
    
    .heading {
        font-family: 'Inter', sans-serif;
        font-size: ${fontSize};
        font-style: normal;
    }
    
    .heading p {
        margin: 0;
        padding: 0;
    }

    .end-spacer {
        margin-top: 4vh;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { title, theme, markdown, fontSize, projectLogo, projectName, authorName, authorImage, version, docusaurus } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <div class="wrapper"> 
            <div class="heading">
                ${emojify(
                    markdown ? marked(title) : sanitizeHtml(title)
                )}
            </div>
            <div class="author-wrapper">
                ${authorImage ? getImage(authorImage, 'author-image', '130') : ''}
                <div class="author-name">
                    ${authorName ? authorName : ''}
                </div>                
            </div>
            <div class="spacer"></div>
            <div class="project-wrapper">
                ${projectLogo ? getImage(projectLogo, 'logo', '150') : ''}
                <div class="project-name">
                    ${projectName ? projectName : ''}
                </div>
                <div class="docusaurus-wrapper">
                    <div class="version">
                        ${version ? version : ''}
                    </div>
                    ${docusaurus ? '<div class="docusaurus"> made with Docusaurus</div>' : ''}
                </div>
            </div>
            <div class="end-spacer"></div>
        </div>
    </body>
</html>`;
}

function getImage(src: string, htmlClass='', height: string, width='auto') {
    return `<img
        class=${htmlClass}
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}
