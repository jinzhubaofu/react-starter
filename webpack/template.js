/**
 * @file html template
 * @author leon <ludafa@outlook.com>
 */

function template({title, css, js}) {

    if (css && css.length) {
        css = css
            .map(item => `<link href="${item}.css" rel="stylesheet" >`)
            .join('\n');
    }

    if (js && js.length) {
        js = js
            .map(item => `<script src="${item}"></script>`)
            .join('\n');
    }

    return `\
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${css}
</head>
<body>
    <main id="app"></main>
    ${js}
</body>
</html>`;
}

module.exports = function ({htmlWebpackPlugin}) {

    let {files, options: {title}} = htmlWebpackPlugin;

    let js = [
        process.env.NODE_ENV !== 'production'
            ? 'dll/vendor.dll.js'
            : files.chunks.vendor.entry,
        files.chunks[title].entry
    ];

    let css = files.chunks[title].css;


    return template({
        js,
        css,
        title
    });

};
