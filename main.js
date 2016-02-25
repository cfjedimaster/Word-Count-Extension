/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, window, Mustache */

define(function (require, exports, module) {
    'use strict';

    var 
        EditorManager           = brackets.getModule("editor/EditorManager"),
        DocumentManager         = brackets.getModule("document/DocumentManager"),
        MainViewManager         = brackets.getModule("view/MainViewManager"),
        AppInit                 = brackets.getModule("utils/AppInit"),
        StatusBar               = brackets.getModule("widgets/StatusBar"),
        StringUtils             = brackets.getModule("utils/StringUtils"),
        textWord, lang;

    function _handleWordCount() {
        var editor = EditorManager.getCurrentFullEditor();
        if (!editor) return;
        var text = editor.getSelectedText() || editor.document.getText();
        //Credit: http://stackoverflow.com/questions/6543917/count-number-of-word-from-given-string-using-javascript 
        var count = text.split(/\s+/).length;
        $("#WordCount").text(StringUtils.format(textWord[lang].text, count));
    }
    
    function activeEditorChangeHandler(event, current, previous) {
        if (current) {
            current.on("editorChange", _handleWordCount);
            current.on("cursorActivity", _handleWordCount);
        }

        if (previous) {
            //Removing all old Handlers
            previous.off("editorChange", _handleWordCount);
            previous.off("cursorActivity", _handleWordCount);
        }
    }

    AppInit.appReady(function () {
        textWord = {
            "en": {
                "text": "Word Count: {0}"
            },
            "es-ES": {
                "text": "Nº de palabras: {0}"
            },
            "fr-FR": {
                "text": "{0} mots"
            }
        };
        lang = textWord[brackets.getLocale()] ? brackets.getLocale() : 'en';

        DocumentManager.on("documentSaved", _handleWordCount);
        MainViewManager.on("currentFileChange", _handleWordCount);
        activeEditorChangeHandler(null, EditorManager.getActiveEditor(), null);

        EditorManager.on("activeEditorChange", activeEditorChangeHandler);

        StatusBar.addIndicator('WordCount', $('<div></div>'), true);

        _handleWordCount();
    });
    
    
});
