import * as parser from "@babel/parser";
import type { ParserOptions, ParserPlugin } from "@babel/parser";
import traverse from "@babel/traverse";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
// Removed unused import as part of build optimization
// import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useRef, useMemo, useState } from "react";
import * as monaco from "monaco-editor";
import { useEditor } from "../context/useEditor";
import AppIcon from "./AppIcons";
import OutlineIcon from "./OutlineIcon";

interface OutlineItem {
  name: string;
  type: string;
  line: number | undefined;
  children: OutlineItem[];
}

const OutlinePanel = () => {
  // إضافة CSS للـ highlight والتداخل
  const styles = `
    .highlight-line {
      background-color: rgb(106, 69, 6) !important;
      border-left: 4px solid rgb(251, 255, 0) !important;
    }
    .nested-item {
      border-left: 2px solid #4a4a4a;
      margin-left: 10px;
      padding-left: 10px;
    }
    .outline-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .outline-item:hover {
      background-color: #2a2a2a;
    }
  `;

  if (typeof document !== "undefined") {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    console.log("OutlinePanel: Stylesheet added to document");
  }

  // Create memoized selectors to prevent unnecessary re-renders
  const clickedFile = useSelector((state: RootState) => state.fileBarSlice.clickedFile);
  const fileName = clickedFile?.fileName || "";
  const code = clickedFile?.fileContent || "";
  const activeTab = clickedFile?.activeTab;

  const { editor } = useEditor();
  const [editorReady, setEditorReady] = useState<boolean>(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (editor && !editorReady) {
      console.log("OutlinePanel: Editor is now available, updating state");
      setEditorReady(true);
    }
  }, [editor, editorReady]);

  const decorationIdsRef = useRef<string[]>([]);

  const isTypeScript = fileName.endsWith(".ts") || fileName.endsWith(".tsx");

  const parserPlugins = useMemo(
    () =>
      [
        isTypeScript ? "typescript" : "jsx",
        ...(isTypeScript ? [] : ["jsx"]),
        "decorators",
        "dynamicImport",
        "classProperties",
        "classPrivateProperties",
        "classPrivateMethods",
      ] as ParserPlugin[],
    [isTypeScript]
  );

  // Reduced logging to minimize performance impact
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log("OutlinePanel: File changed:", fileName);
    }
  }, [activeTab, fileName]);

  const outline = useMemo(() => {
    const result: OutlineItem[] = [];
    const stack: { node: OutlineItem; scope: string }[] = [];

    if (!code.trim()) {
      console.log("OutlinePanel: Code is empty");
      return result;
    }

    try {
      const parserOptions: ParserOptions = {
        sourceType: "module",
        plugins: parserPlugins as ParserPlugin[],
        errorRecovery: true,
        allowReturnOutsideFunction: true,
      };

      const ast = parser.parse(code, parserOptions);

      // Remove expensive logging
      if (process.env.NODE_ENV !== 'production') {
        console.log("OutlinePanel: AST parsed successfully");
      }

      traverse(ast, {
        enter(path) {
          const line = path.node.loc?.start.line;
          let newItem: OutlineItem | null = null;

          if (path.isFunctionDeclaration()) {
            newItem = {
              name: path.node.id?.name || "anonymous",
              type: "function",
              line,
              children: [],
            };
          } else if (path.isVariableDeclaration()) {
            path.node.declarations.forEach((decl) => {
              if (decl.id.type === "Identifier") {
                if (
                  decl.init &&
                  (decl.init.type === "FunctionExpression" ||
                    decl.init.type === "ArrowFunctionExpression")
                ) {
                  newItem = {
                    name: decl.id.name,
                    type: "function",
                    line,
                    children: [],
                  };
                } else {
                  newItem = {
                    name: decl.id.name,
                    type: "variable",
                    line,
                    children: [],
                  };
                }
              }
            });
          } else if (path.isClassDeclaration()) {
            newItem = {
              name: path.node.id?.name || "anonymous class",
              type: "class",
              line,
              children: [],
            };
          } else if (path.isTSInterfaceDeclaration()) {
            newItem = {
              name: path.node.id.name,
              type: "interface",
              line,
              children: [],
            };
          } else if (path.isTSTypeAliasDeclaration()) {
            newItem = {
              name: path.node.id.name,
              type: "type",
              line,
              children: [],
            };
          } else if (path.isImportDeclaration()) {
            const specifiers = path.node.specifiers
              .map((spec) => spec.local.name)
              .join(", ");
            newItem = {
              name: `import ${specifiers} from "${path.node.source.value}"`,
              type: "import",
              line,
              children: [],
            };
          }

          if (newItem) {
            // Remove repetitive logging for each item
            if (process.env.NODE_ENV !== 'production' && !stack.length) {
              console.log(`OutlinePanel: Found top-level ${newItem.type}: ${newItem.name}`);
            }
            if (stack.length === 0) {
              result.push(newItem);
            } else {
              stack[stack.length - 1].node.children.push(newItem);
            }

            if (
              path.isFunctionDeclaration() ||
              path.isClassDeclaration() ||
              path.isFunctionExpression() ||
              path.isArrowFunctionExpression()
            ) {
              stack.push({ node: newItem, scope: path.scope.uid.toString() });
            }
          }
        },
        exit(path) {
          if (
            path.isFunctionDeclaration() ||
            path.isClassDeclaration() ||
            path.isFunctionExpression() ||
            path.isArrowFunctionExpression()
          ) {
            stack.pop();
          }
        },
      });

      if (process.env.NODE_ENV !== 'production') {
        console.log("OutlinePanel: Generated outline with items:", result.length);
      }
    } catch (error) {
      console.error("OutlinePanel: Failed to parse code:", error);
    }
    return result;
  }, [code, parserPlugins]);

  const handleOutlineClick = (lineNumber: number | undefined) => {
    if (!editor) {
      console.error("OutlinePanel: Editor is not available");
      return;
    }
    if (!lineNumber) {
      console.error("OutlinePanel: Invalid line number");
      return;
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log("OutlinePanel: Navigating to line", lineNumber);
    }
    const monacoEditor = editor as monaco.editor.IStandaloneCodeEditor;
    monacoEditor.revealLineInCenter(lineNumber);
    monacoEditor.setPosition({ lineNumber, column: 1 });
    monacoEditor.focus();

    monacoEditor.deltaDecorations(decorationIdsRef.current, []);
    decorationIdsRef.current = [];

    const newDecorations = [
      {
        range: new monaco.Range(lineNumber, 1, lineNumber, 1),
        options: {
          isWholeLine: true,
          className: "highlight-line",
        },
      },
    ];
    decorationIdsRef.current = monacoEditor.deltaDecorations([], newDecorations);

    setTimeout(() => {
      monacoEditor.deltaDecorations(decorationIdsRef.current, []);
      decorationIdsRef.current = [];
    }, 3000);
  };

  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const renderOutlineItem = (item: OutlineItem, depth: number = 0) => {
    const itemId = `${item.type}-${item.name}-${item.line}`;
    const isExpanded = expandedItems.has(itemId);
    const hasChildren = item.children.length > 0;

    return (
      <div key={itemId} className={depth > 0 ? "nested-item" : ""}>
        <div
          className="outline-item cursor-pointer p-1 rounded"
          onClick={() => handleOutlineClick(item.line)}
        >
          {hasChildren && (
            <AppIcon
              iconName={isExpanded ? "chevronDown" : "chevronRight"}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(itemId);
              }}
              className="text-gray-400"
            />
          )}
          <OutlineIcon type={item.type} />
          <span className="text-gray-400 text-xs">{item.name}</span>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {item.children.map((child) => renderOutlineItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!editor) {
    return <p className="text-gray-500">جاري تحميل الـ Editor...</p>;
  }
  // Remove render logging
  return (
    <div className="p-2 bg-[#1E1E1E] text-white">
      {code.trim() ? (
        outline.length > 0 ? (
          <div>{outline.map((item) => renderOutlineItem(item))}</div>
        ) : (
          <p className="text-gray-500">
            ما فيش عناصر في الـ Outline (تأكدي من الكود)
          </p>
        )
      ) : (
        <p className="text-gray-500">ما فيش كود لعرض الـ Outline</p>
      )}
    </div>
  );
};

export default OutlinePanel;