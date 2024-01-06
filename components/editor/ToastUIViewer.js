import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

export default function ToastUIViewer({ content, style }) {
  return (
    <section>
      <Viewer initialValue={content} />
    </section>
  );
}