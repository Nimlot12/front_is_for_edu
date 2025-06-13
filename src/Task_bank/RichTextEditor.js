import React, { useState, useEffect } from "react";
import { EditorState, Modifier, AtomicBlockUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "katex/dist/katex.min.css";
import { MathComponent } from "mathjax-react";
import SymbolPicker from "./SymbolPicker";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import "./RichTextEditor.css";

const RichTextEditor = ({ content, setContent }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showSymbols, setShowSymbols] = useState(false);

  const insertSymbol = (symbol) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const contentStateWithEntity = contentState.createEntity("SYMBOL", "IMMUTABLE", { symbol });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newContentState = Modifier.insertText(contentState, selectionState, symbol, null, entityKey);
    const newEditorState = EditorState.push(editorState, newContentState, "insert-characters");
    setEditorState(newEditorState);
    setShowSymbols(false);
  };

  const insertImage = (imageUrl) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity("IMAGE", "IMMUTABLE", { src: imageUrl });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, " ");
    setEditorState(newEditorState);
  };


  const insertFormula = () => {
    const formula = prompt("Введите формулу в формате LaTeX:");
    if (formula) {
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity("FORMULA", "IMMUTABLE", { formula });
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, " ");
      setEditorState(newEditorState);
    }
  };

  const SymbolButton = () => (
    <div style={{ position: "relative" }}>
      <button onClick={() => setShowSymbols(!showSymbols)} className="rdw-option-wrapper">Ω</button>
      {showSymbols && (
        <div className="symbol-picker-container">
          <SymbolPicker onSelect={insertSymbol} />
        </div>
      )}
    </div>
  );

  const FormulaButton = () => (
    <button onClick={insertFormula} className="rdw-option-wrapper">∑</button>
  );

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const html = draftToHtml(rawContent);
    setContent(html); 
  }, [editorState]);

  return (
    <div className="editor-container">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="rdw-editor-wrapper"
        editorClassName="rdw-editor-main"
        toolbar={{
          options: ["inline", "blockType", "fontFamily", "fontSize", "list", "textAlign", "colorPicker", "link", "history", "image"],
          inline: { options: ["bold", "italic", "underline", "strikethrough"] },
          list: { options: ["unordered", "ordered"] },
          textAlign: { options: ["left", "center", "right", "justify"] },
          link: { options: ["link", "unlink"] },
          colorPicker: true,
          fontFamily: {
            options: ["Arial", "Georgia", "Times New Roman", "Verdana", "Tahoma"],
            className: (font) => `fontFamily${font.replace(/ /g, '')}`,
          },
        }}
        toolbarCustomButtons={[<SymbolButton />, <FormulaButton />]}
        customDecorators={[{
          strategy: (contentBlock, callback, contentState) => {
            const text = contentBlock.getText();
            const regex = /\\\((.*?)\\\)/g;
            let match;
            while ((match = regex.exec(text)) !== null) {
              callback(match.index, match.index + match[0].length);
            }
          },
          component: ({ decoratedText }) => <MathComponent tex={decoratedText} />,
        }]}
      />
    </div>
  );
};

export default RichTextEditor;


