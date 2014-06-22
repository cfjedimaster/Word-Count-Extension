/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, window, Mustache */

define(function (require, exports, module) {
    'use strict';

    var 
        CommandManager          = brackets.getModule("command/CommandManager"),
        EditorManager           = brackets.getModule("editor/EditorManager"),
        DocumentManager         = brackets.getModule("document/DocumentManager"),
        ExtensionUtils          = brackets.getModule("utils/ExtensionUtils"),
        Menus                   = brackets.getModule("command/Menus"),
        AppInit                 = brackets.getModule("utils/AppInit"),
        NativeApp               = brackets.getModule("utils/NativeApp");


    //commands
    var DO_COUNT = "wordcount.run";

    function _handleWordCount() {
        var editor = EditorManager.getCurrentFullEditor();
        var text = editor.document.getText();
        console.log(text);
        //Credit: http://stackoverflow.com/questions/6543917/count-number-of-word-from-given-string-using-javascript 
        var count = text.split(/\s+/).length
        alert(count +" words in document.");
    }
    
    CommandManager.register("Count Number of Words", DO_COUNT, _handleWordCount);

    AppInit.appReady(function () {

        var menu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU);
        menu.addMenuItem(DO_COUNT, null, Menus.AFTER);

    });
    
    
});