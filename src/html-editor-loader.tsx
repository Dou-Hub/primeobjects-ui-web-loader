import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { isNil } from 'lodash';
import { _window } from 'primeobjects-helper-util';
import { CSS } from 'primeobjects-ui-web-basic/build/cjs/controls/css';
import { HTML_EDITOR_PROPS_TYPE } from 'primeobjects-ui-web-html/build/cjs/html-editor-type';
import { HTML_EDITOR_CSS } from 'primeobjects-ui-web-html/build/cjs/html-css';

export const HtmlEditorLoader = (props: HTML_EDITOR_PROPS_TYPE & { loadingContent?: string | JSX.Element }) => {

    const loadingContent: string | JSX.Element = !isNil(props.loadingContent) ? props.loadingContent : <p>...</p>;
    const className = props.className ? props.className : '';
    const style = props.style ? props.style : {};
    const [ready, setReady] = useState(0);

    useEffect(() => {
        if (!_window.HtmlEditor) {
           _window.HtmlEditor = dynamic(() => import("primeobjects-ui-web-html/build/cjs/html-editor"), { ssr: false });
        }
        setReady(1);
    }, [])

    const HtmlEditor = _window.HtmlEditor;
    return <>
        {ready >= 1 && <HtmlEditor {...props} className={ready == 2 ? className : `${className} hidden`} onReady={() => { setReady(2) }} />}
        <CSS id="html-editor-css" content={HTML_EDITOR_CSS} />
        {ready != 2 && <div className={className} style={style}>
            {loadingContent}
        </div>}
    </>

};

export default HtmlEditorLoader;