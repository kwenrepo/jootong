// Toast UI Editor

import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

export default function ToastUIEditor({ content = "", config, editorRef }) {
  console.log(config);

  const toolbar = [
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote", "ul", "ol"],
    ["task", "indent", "outdent"],
    ["table", "image", "link"],
  ];

  return (
    <Editor
      height={config.height}
      hideModeSwitch={config.hideModeSwitch}
      initialEditType={config.initialEditType}
      placeholder={config.placeholder}
      initialValue={content || " "}
      toolbarItems={toolbar}
      ref={editorRef}
      autofocus={true}
      usageStatistics={false}
    />
  );
}
