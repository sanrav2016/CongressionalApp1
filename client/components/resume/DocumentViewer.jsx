import React from 'react';
import { WebView } from 'react-native-webview';

const DocumentViewer = ({ body }) => {
    return (
        <WebView
            source={{ html: body }}
        />
    );
};
export default DocumentViewer;