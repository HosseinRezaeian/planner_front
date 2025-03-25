import { RichTextEditor, Link, getTaskListExtension } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { IconAdjustments, IconColorPicker, IconLayoutNavbarExpandFilled } from '@tabler/icons-react';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import TaskItem from '@tiptap/extension-task-item';
import TipTapTaskList from '@tiptap/extension-task-list';
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { ActionIcon } from '@mantine/core';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditorMantine({ value, onChange }: RichTextEditorProps) {
  const [shownav,handler]=useDisclosure(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      getTaskListExtension(TipTapTaskList), // اضافه کردن Task List
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'test-item',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <RichTextEditor editor={editor}>
      <ActionIcon variant="filled" onClick={handler.toggle}>
        <IconLayoutNavbarExpandFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
{
  shownav ? (<RichTextEditor.Toolbar sticky stickyOffset={60}>
    {/* Color Picker */}
    <RichTextEditor.ColorPicker
      colors={[
        '#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb',
        '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886',
        '#40c057', '#82c91e', '#fab005', '#fd7e14',
      ]}
    />

    <RichTextEditor.ControlsGroup>
      <RichTextEditor.Control interactive={false}>
        <IconColorPicker size={16} stroke={1.5} />
      </RichTextEditor.Control>
      <RichTextEditor.Color color="#F03E3E" />
      <RichTextEditor.Color color="#7048E8" />
      <RichTextEditor.Color color="#1098AD" />
      <RichTextEditor.Color color="#37B24D" />
      <RichTextEditor.Color color="#F59F00" />
    </RichTextEditor.ControlsGroup>

    <RichTextEditor.ControlsGroup>
      <RichTextEditor.Bold />
      <RichTextEditor.Italic />
      <RichTextEditor.Underline />
      <RichTextEditor.Strikethrough />
      <RichTextEditor.ClearFormatting />
      <RichTextEditor.Highlight />
      <RichTextEditor.Code />
    </RichTextEditor.ControlsGroup>

    <RichTextEditor.ControlsGroup>
      <RichTextEditor.H1 />
      <RichTextEditor.H2 />
      <RichTextEditor.H3 />
      <RichTextEditor.H4 />
    </RichTextEditor.ControlsGroup>

    <RichTextEditor.ControlsGroup>
      <RichTextEditor.Blockquote />
      <RichTextEditor.Hr />
      <RichTextEditor.BulletList />
      <RichTextEditor.OrderedList />
      <RichTextEditor.Subscript />
      <RichTextEditor.Superscript />
    </RichTextEditor.ControlsGroup>

    <RichTextEditor.ControlsGroup>
      <RichTextEditor.Link />
      <RichTextEditor.Unlink />
    </RichTextEditor.ControlsGroup>

    <RichTextEditor.ControlsGroup>
      <RichTextEditor.AlignLeft />
      <RichTextEditor.AlignCenter />
      <RichTextEditor.AlignJustify />
      <RichTextEditor.AlignRight />
    </RichTextEditor.ControlsGroup>

    <RichTextEditor.ControlsGroup>
      <RichTextEditor.Undo />
      <RichTextEditor.Redo />
    </RichTextEditor.ControlsGroup>

    {/* Task List Controls */}
    <RichTextEditor.ControlsGroup>
      <RichTextEditor.TaskList />
      <RichTextEditor.TaskListLift />
      <RichTextEditor.TaskListSink />
    </RichTextEditor.ControlsGroup>

    <RichTextEditor.UnsetColor />
  </RichTextEditor.Toolbar>) : ""
}
      

      {editor && <RichTextEditor.Content />}
    </RichTextEditor>
  );
}