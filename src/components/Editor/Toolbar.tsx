"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Language } from "@/utils/Language";
import { useState } from "react";

type Props = {
  language: string;
  onRun: () => void;
  onSave: () => void;
  onPushToGitHub: () => void;
  onVoiceMode: () => void;
};

const Toolbar = ({
  language: initialLanguage,
  onRun,
  onSave,
  onPushToGitHub,
  onVoiceMode,
}: Props) => {
  const [language, setLanguage] = useState(initialLanguage);

  return (
    <div className="w-full p-3 border-b bg-background flex items-center gap-2">
      <Button onClick={onSave} variant="outline">
        💾 Save
      </Button>
      <Button onClick={onRun} variant="outline">
        ▶️ Run
      </Button>
      <Button onClick={onPushToGitHub} variant="outline">
        ⬆️ GitHub
      </Button>
      <Button onClick={onVoiceMode} variant="default">
        🎙️ Voice Mode
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{language}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select the language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
            {Language.map((lang) => (
              <DropdownMenuRadioItem key={lang} value={lang}>
                {lang}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Toolbar;
