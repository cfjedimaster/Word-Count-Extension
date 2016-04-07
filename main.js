/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, window, Mustache */

define(function (require, exports, module) {
    'use strict';

    var EditorManager           = brackets.getModule('editor/EditorManager'),
        DocumentManager         = brackets.getModule('document/DocumentManager'),
        MainViewManager         = brackets.getModule('view/MainViewManager'),
        AppInit                 = brackets.getModule('utils/AppInit'),
        StatusBar               = brackets.getModule('widgets/StatusBar'),
        StringUtils             = brackets.getModule('utils/StringUtils'),
        textWord,
        lang;

    function handleWordCount() {
        var editor = EditorManager.getCurrentFullEditor();
        if (!editor) {
            return;
        }
        var text = editor.getSelectedText() || editor.document.getText();
        //Credit: http://stackoverflow.com/questions/6543917/count-number-of-word-from-given-string-using-javascript 
        var wordCount = text.split(/\s+/).length;
        var charCount = text.length;
        $('#WordCount')
            .text(StringUtils.format(textWord[lang].words, wordCount))
            .attr('title', StringUtils.format(textWord[lang].chars, charCount));
    }
    
    function activeEditorChangeHandler(event, current, previous) {
        if (current) {
            current.on('editorChange', handleWordCount);
            current.on('cursorActivity', handleWordCount);
        }

        if (previous) {
            //Removing all old Handlers
            previous.off('editorChange', handleWordCount);
            previous.off('cursorActivity', handleWordCount);
        }
    }

    AppInit.appReady(function () {
        textWord = {
            'en': {
                'words': 'Word Count: {0}',
                'chars': 'Character Count: {0}'
            },
            'es-ES': {
                'words': 'Nº de palabras: {0}',
                'chars': 'Nº de caracteres: {0}'
            },
            'fr-FR': {
                'words': '{0} mots',
                'chars': 'Caractères (espaces compris) : {0}'
            }
        };
        lang = textWord[brackets.getLocale()] ? brackets.getLocale() : 'en';

        DocumentManager.on('documentSaved', handleWordCount);
        MainViewManager.on('currentFileChange', handleWordCount);
        activeEditorChangeHandler(null, EditorManager.getActiveEditor(), null);

        EditorManager.on('activeEditorChange', activeEditorChangeHandler);

        StatusBar.addIndicator('WordCount', $('<div title=""></div>'), true);

        handleWordCount();
    });
    
    
});