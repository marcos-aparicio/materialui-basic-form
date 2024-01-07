import React, { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/default.css"; // Import the default Highlight.js style
import json from "highlight.js/lib/languages/json";
import { Box } from "@mui/material";
hljs.registerLanguage("json", json);

export const CodeBlock = ({
  language,
  value,
}: {
  language: string;
  value: string;
}) => {
  useEffect(() => {
    const fetchLanguage = async () => {
      const nodes = document.querySelectorAll("pre code");
      nodes.forEach((node) => {
        const theNode = node as HTMLElement;
        delete theNode?.dataset?.highlighted;
        hljs.highlightElement(theNode);
      });
    };
    fetchLanguage();
  }, [value, language]);
  return (
    <Box component="pre">
      <Box component="code" sx={{ borderRadius: 2 }}>
        {value}
      </Box>
    </Box>
  );
};
