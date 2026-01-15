'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit"
import { Text } from "@tiptap/extension-text" 
import { useEffect, useState } from 'react'
import MenuBar from './menu-bar';
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import TagInput from './tag-input'
import { Input } from '@/components/ui/input'
import AICompose from './AI-Compose'
import { generate } from './action'

type Props = {
    toValues: { label: string, value: string }[];
    ccValues: { label: string, value: string }[];

    subject: string;
    setSubject: (subject: string) => void;
    to: string[]
    handleSend: (value: string) => void;
    isSending: boolean;

    onToChange: (values: { label: string, value: string }[]) => void;
    onCcChange: (values: { label: string, value: string }[]) => void;

    defaultToolbarExpand?: boolean;
}

export default function EmailEditor({ subject, setSubject, toValues, ccValues, to, handleSend, isSending, onToChange, onCcChange, defaultToolbarExpand }: Props) {
    const [value, setValue] = useState('');
    const [expanded, setExpanded] = useState<boolean | undefined>(defaultToolbarExpand);
    const [generation, setGeneration] = useState('');

    const aiGenerate = async (prompt: string) => {
        const { output } = await generate(prompt)

        for await (const delta of output) {
            if (delta) {
                setGeneration(delta);
            }
        }
    };

    const customText = Text.extend({
        addKeyboardShortcuts() {
            return {
                'Mod-Shift-j': () => {
                    aiGenerate(this.editor.getText());   
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

    
    useEffect(() => {
        if (!generation || !editor) return;
        editor.commands.insertContent(generation)
    }, [generation, editor]);

    const onGenerate = (token:string) => {
        editor?.commands?.insertContent(token);
    };

    if(!editor) return null;

  return (
    <div>
        <div className='flex px-4 py-2 border-b'>
            <MenuBar editor={editor} />
        </div>
        <div className='p-4 pb-0 space-y-2'>
            {expanded && (
                <>
                    <TagInput  label='To' onChnage={onToChange} placeholder='Add Recipients' value={toValues} />
                    <TagInput  label='Cc' onChnage={onCcChange} placeholder='Add Recipients' value={ccValues} />
                    <Input id='subject' placeholder='Subject' value={subject} onChange={(e) => setSubject(e.target.value)} />
                </>
            )}
            <div className='flex items-center gap-2'>
                <div className='cursor-pointer' onClick={() => setExpanded(!expanded)}>
                    <span className='text-green-600 font-medium'>Draft {" "}</span>
                    <span>to {to?.join(', ')}</span>
                </div>
                <AICompose isComposing={defaultToolbarExpand} onGenerate={onGenerate} />
            </div>
        </div>
        <div className='prose w-full p-4'>
            <EditorContent editor={editor} value={value} placeholder="Write your email here..." />
        </div>
        <Separator />
        <div className='py-3 px-4 flex items-center justify-between'>
            <span className='text-sm'>Tip: Press {" "} <kbd className='px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border-gray-200 rounded-lg'>Cmd + J</kbd>{" "} for AI autocomplete</span>
            <Button disabled={isSending} onClick={ async () => { 
                editor?.commands?.clearContent() ,
                await handleSend(value) }}
            >Send</Button>
        </div>
    </div>
  )
}
