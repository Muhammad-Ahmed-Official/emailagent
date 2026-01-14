'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit"
import { Text } from "@tiptap/extension-text" 
import { useState } from 'react'
import MenuBar from './menu-bar';

export default function EmailEditor() {
    const [value, setValue] = useState('');
    const customText = Text.extend({
        addKeyboardShortcuts() {
            return {
                'Meta-j': () => {
                    return true;
                }
            }
        }
    })

    const editor = useEditor({
        autofocus: false,
        extensions: [StarterKit, customText],
        onUpdate: ({ editor}) => {
            setValue(editor.getHTML())
        },
        immediatelyRender: false
    });

    if(!editor) return null;

  return (
    <div>
        <MenuBar editor={editor} />
        <div className='prose w-full px-4'>
            <EditorContent editor={editor} value={value} />
        </div>
    </div>
  )
}
