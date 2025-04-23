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
<<<<<<< HEAD
//import { useState } from "react";
=======
import { useState } from "react";
>>>>>>> 8ed5734575220d4200cb1e6bd056718fbe503226
import { languageMap } from "@/utils/Language";

type Props = {
  language: string;
  onLanguageChange: (lang: string) => void;
  onRun: () => void;
  onSave: () => void;
  onPushToGitHub: () => void;
  onVoiceMode: () => void;
};

const Toolbar = ({
  language,
  onLanguageChange,
  onRun,
  onSave,
  onPushToGitHub,
  onVoiceMode,
}: Props) => {
<<<<<<< HEAD
=======

>>>>>>> 8ed5734575220d4200cb1e6bd056718fbe503226
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
<<<<<<< HEAD
          <DropdownMenuRadioGroup
            value={language}
            onValueChange={onLanguageChange}
          >
=======
          <DropdownMenuRadioGroup value={language} onValueChange={onLanguageChange}>
>>>>>>> 8ed5734575220d4200cb1e6bd056718fbe503226
            {Object.keys(languageMap).map((lang) => (
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
