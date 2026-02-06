"use client";

import { useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

// 1. Props 타입 정의
interface PostEditorProps {
  content: string;
  onChange: (val: string) => void;
}

export default function PostEditor({ content, onChange }: PostEditorProps) {
  const editorRef = useRef<Editor>(null);

  // 2. 외부에서 content가 바뀌면 에디터 내용 동기화
  useEffect(() => {
    if (editorRef.current) {
      const instance = editorRef.current.getInstance();
      if (instance.getMarkdown() !== content) {
        instance.setMarkdown(content || " ");
      }
    }
  }, [content]);

  // 3. 에디터 내용이 바뀔 때 부모의 setContent 실행
  const handleEditorChange = () => {
    if (editorRef.current) {
      const markdown = editorRef.current.getInstance().getMarkdown();
      onChange(markdown);
    }
  };

  return (
    <div className="h-full toast-ui-editor-container relative">
      <Editor
        ref={editorRef}
        initialValue={content || " "}
        previewStyle="vertical"
        height="100%"
        initialEditType="markdown"
        useCommandShortcut={true}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        onChange={handleEditorChange}
        language="ko-KR"
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "image", "link"],
          ["code", "codeblock"],
        ]}
      />
    </div>
  );
}
