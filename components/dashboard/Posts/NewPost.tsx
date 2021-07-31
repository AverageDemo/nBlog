import { useRouter } from 'next/router';
import type { Session } from 'next-auth';
import { FormEvent, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Category } from '@prisma/client';

export default function NewPost({ categories, session }: Props) {
  const router = useRouter();
  const [values, setValues] = useState({
    title: '',
    content: '',
    published: 'false',
    tags: '',
    cid: '1',
  });
  const editorRef: any = useRef(null);

  const handleInputChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some((element) => element === '');

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
      return;
    }

    const res = await fetch(`/api/blog/new-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    } else {
      router.push(`/dashboard/p/${data.post.slug}`);
    }
  };

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <ToastContainer />
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={handleInputChange}
                  autoComplete="title"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="published" className="block text-sm font-medium text-gray-700">
                Published
              </label>
              <div className="mt-1">
                <select
                  id="published"
                  name="published"
                  autoComplete="published"
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="false" selected>
                    False
                  </option>
                  <option value="true">True</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="cid" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="mt-1">
                <select
                  id="cid"
                  name="cid"
                  autoComplete="cid"
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  onChange={handleInputChange}
                  autoComplete="tags"
                  placeholder="Command delimiter (eg tag1, tag2, tag3)"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <div className="mt-1">
                <Editor
                  onEditorChange={(newValue, editor) => setValues({ ...values, content: newValue })}
                  textareaName="content"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen codesample',
                      'insertdatetime media table paste code help wordcount textpattern',
                    ],
                    toolbar:
                      'undo redo | formatselect | ' +
                      'bold italic backcolor | codesample code | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    formats: {
                      h2: { block: 'h2', classes: 'text-xl' },
                      h3: { block: 'h3', classes: 'text-2xl' },
                      h1: { block: 'h1', classes: 'text-lg' },
                      h4: { block: 'h4', classes: 'text-3xl' },
                      h5: { block: 'h5', classes: 'text-4xl' },
                      h6: { block: 'h6', classes: 'text-5xl' },
                    },
                    textpattern_patterns: [
                      { start: '*', end: '*', format: 'italic' },
                      { start: '**', end: '**', format: 'bold' },
                      { start: '```', end: '```', format: 'code' },
                      { start: '#', format: 'h1' },
                      { start: '##', format: 'h2' },
                      { start: '###', format: 'h3' },
                      { start: '####', format: 'h4' },
                      { start: '#####', format: 'h5' },
                      { start: '######', format: 'h6' },
                      { start: '1. ', cmd: 'InsertOrderedList' },
                      { start: '* ', cmd: 'InsertUnorderedList' },
                      { start: '- ', cmd: 'InsertUnorderedList' },
                      { start: '//brb', replacement: 'Be Right Back' },
                    ],
                    codesample_languages: [
                      { text: 'HTML/XML', value: 'markup' },
                      { text: 'JavaScript', value: 'javascript' },
                      { text: 'CSS', value: 'css' },
                      { text: 'PHP', value: 'php' },
                      { text: 'Ruby', value: 'ruby' },
                      { text: 'Python', value: 'python' },
                      { text: 'Java', value: 'java' },
                      { text: 'C', value: 'c' },
                      { text: 'C#', value: 'csharp' },
                      { text: 'C++', value: 'cpp' },
                    ],
                    setup: function (ed) {
                      ed.on('keydown', (evt) => {
                        if (evt.key === 'Tab') {
                          ed.execCommand('mceInsertContent', false, '&emsp;&emsp;');
                          evt.preventDefault();
                        }
                      });
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

type Props = {
  categories?: Category[];
  session: Session | null;
};
